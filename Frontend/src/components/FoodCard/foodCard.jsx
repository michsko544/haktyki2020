import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { FoodCardStyled } from './foodCard.style'
import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'

import {
  displayPurchaser,
  displayDate,
  displayTime,
  findLoggedPerson,
  useResizeObserver
} from './../../utils'

const useStyles = makeStyles({
  root: {
    maxWidth: 340,
  },
  media: {
    height: 200,
  },
})

const FoodCard = ({ details, openCallback, ...props }) => {
  const store = Store.useStore()
  const classes = useStyles()

  const { imageRef, imageUrl, setImage } = useResizeObserver()

  const savedOrderText = (order) => {
    const time = new Date(`${order.date} ${order.time}`)
    const now = new Date()

    if (time > now) {
      return 'Zapisałeś: '
    } else {
      return 'Zamówiłeś: '
    }
  }

  const orderDetails = () => {
    if (findLoggedPerson(store.get('userId'), details)) {
      return (
        <>
          <Typography variant="body2" color="textSecondary" component="p">
            {savedOrderText(details)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {findLoggedPerson(store.get('userId'), details).description}
          </Typography>
        </>
      )
    }
  }

  useEffect(() => {
    setImage(details.image)
  }, [details.image, setImage])

  return (
    <FoodCardStyled {...props}
      background={
        AppBackgroundThemes[store.get('themeBackgroundId')].cardBackground
      }
      className={classes.root}
    >
      <CardActionArea onClick={openCallback}>
        <CardMedia
          className={classes.media}
          title={details.name}
          image={imageUrl || details.image}
          ref={imageRef}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {details.restaurant}
          </Typography>
          <Typography color="textSecondary" component="p">
            {displayPurchaser(store.get('userId'), details)} -{' '}
            {displayDate(details)} {displayTime(details)}
          </Typography>
          <Typography component="p">
            Obecnie chętnych: {details.orderDetails.length}
          </Typography>
          {orderDetails()}
        </CardContent>
      </CardActionArea>
    </FoodCardStyled>
  )
}

FoodCard.propTypes = {
  details: PropTypes.any,
  openCallback: PropTypes.func,
}

export default FoodCard
