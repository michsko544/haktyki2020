import React from 'react'
import { SmallTitle } from '../Header'
import Input from "../../../Input"

const OrderForm = () => {
    const isDarkMode = true

    return (
        <>
          <SmallTitle isdarkmode={isDarkMode.toString()}>
                {`Co chcesz zamówić?`}
          </SmallTitle>
        </>
    )
}

export default OrderForm
