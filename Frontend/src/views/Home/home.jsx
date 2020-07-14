import React from 'react'

import H1 from './../../components/H1'
import H2 from './../../components/H2'
import H3 from './../../components/H3'
import HBold from './../../components/HeadingBold'

const Home = () => {
  return (
    <>
      <H1 color="#F0F0F0">
        Team<HBold>Food</HBold>
      </H1>
      <H2 color="#CACAFF">
        Po prostu zamów swoje <HBold>jedzenie</HBold>.
      </H2>
      <H3 color="#FFCA0C">
        Po prostu zamów swoje <HBold>jedzenie</HBold>.
      </H3>
    </>
  )
}

export default Home
