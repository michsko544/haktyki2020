import React from 'react'

import H1 from './../../components/H1'
import HBold from './../../components/HeadingBold'
import Header from '../../components/Header/header'

import TuneIcon from '@material-ui/icons/Tune'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import Button from './../../components/Button'

const Home = () => {
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
    </>
  )
}

export default Home
