import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FoodCardStyled } from './foodCard.style'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
})

export default function FoodCard() {
  const classes = useStyles()

  return (
    <FoodCardStyled className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Zdrowa Krowa
          </Typography>
          <Typography color="textSecondary" component="p">
            Zamawia Grzegorz - Dziś 18:00
          </Typography>
          <Typography component="p">Obecnie chętnych: 4</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Zapisałeś:
            <p>
              Podwójny McZestaw z frytkami i colą, Pizza z Ananasem, McBurger z
              kaktusem
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </FoodCardStyled>
  )
}
