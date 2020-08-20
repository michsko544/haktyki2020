import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FoodCardStyled } from './foodCard.style'
import Skeleton from '@material-ui/lab/Skeleton'
import { useColors } from '../../utils'

const useStyles = makeStyles({
  root: {
    maxWidth: 335,
  },
  media: {
    height: 200,
  },
})

const FoodCardSkeleton = ({ ...props }) => {
  const classes = useStyles()
  const { mode } = useColors()

  return (
    <FoodCardStyled {...props} background={mode.cardBackground} className={classes.root}>
      <CardActionArea>
        <Skeleton className={classes.media} variant="rect" width="100%" height="200px" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton variant="text" />
          </Typography>
          <Typography color="textSecondary" component="p">
            <Skeleton variant="text" />
          </Typography>
          <Typography component="p">
            <Skeleton variant="text" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </FoodCardStyled>
  )
}

export default FoodCardSkeleton
