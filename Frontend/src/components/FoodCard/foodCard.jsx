import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { FoodCardStyled } from './foodCard.style'

import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'

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

  const orderDetails = () => {
    if (details.orderDetails) {
      return (
        <>
          <Typography variant="body2" color="textSecondary" component="p">
            Zapisałeś:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Podwójny McZestaw z frytkami i colą, Pizza z Ananasem, McBurger z
            kaktusem
          </Typography>
        </>
      )
    }
  }

  return (
    <FoodCardStyled
      background={
        AppBackgroundThemes[store.get('themeBackgroundId')].cardBackground
      }
      className={classes.root}
    >
      <CardActionArea onClick={openCallback}>
        <CardMedia
          className={classes.media}
          image={details.image}
          title={details.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {details.name}
          </Typography>
          <Typography color="textSecondary" component="p">
            Zamawia {details.purchaser} - Dziś {details.time}
          </Typography>
          <Typography component="p">
            Obecnie chętnych: {details.interested}
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
