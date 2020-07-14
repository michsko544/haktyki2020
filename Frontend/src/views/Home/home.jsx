import React from 'react'

import H1 from './../../components/H1'
import H3 from './../../components/H3'
import HBold from './../../components/HeadingBold'
import Header from '../../components/Header/header'
import Container from './Container'
import TuneIcon from '@material-ui/icons/Tune'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import Button from './../../components/Button'
import Card from '../../components/FoodCard/foodCard'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const Home = () => {
  const tileData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]

  return (
    <>
      <Header>
        <H1 color="#F0F0F0">
          Cześć <HBold>Tomek,</HBold>
        </H1>
        <div className="icons">
          <NotificationsNoneOutlinedIcon />
          <TuneIcon />
        </div>
        <Button text="Dodaj Zamówienie"></Button>
      </Header>
      <Container>
        <div className="your-order">
          <H3 color="#F0F0F0">Twoje zamówienie</H3>
          <Card></Card>
        </div>
        <div className="available-orders-wrapper">
          <H3 color="#F0F0F0">Dostępne zamówienia</H3>
          <div className="orders">
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
