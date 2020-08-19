import React from 'react'
import Store from './../App/App.store'
import { AppBackgroundThemes } from './../App/App.themes'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FoodCardStyled } from './foodCard.style'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  root: {
    maxWidth: 335,
  },
  media: {
    height: 200,
  },
})

const FoodCardSkeleton = ({ ...props }) => {
  const store = Store.useStore()
  const classes = useStyles()

  return (
    <FoodCardStyled {...props} background={AppBackgroundThemes[store.get('themeBackgroundId')].cardBackground} className={classes.root}>
      <CardActionArea>
        <Skeleton className={classes.media} variant="rect" width="100%" height="200px" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <Skeleton variant="text" />
          </Typography>
          <Typography color="textSecondary" component="p"><Skeleton variant="text" /></Typography>
          <Typography component="p"><Skeleton variant="text" /></Typography>
        </CardContent>
      </CardActionArea>
    </FoodCardStyled>
  )
}

export default FoodCardSkeleton
