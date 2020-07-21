import React from 'react'
import OrderBox from '../../'
import OrderList from '../OrderList'
import OrderFormik from "../OrderForm"
import { OrderRecord } from '../OrderList'
import OrderText from '../'
import Button from '../../../Button'
import { useFetch } from '../../../../API'
import {ButtonWrapper, TextDisplayer} from "../../"

const OrderDetails = () => {
  const [wantOrder,setWantOrder] = React.useState(false);
  const { response, getData, isLoading, error } = useFetch('/orders/1')

  React.useEffect(() => {
    getData()
  }, [])

  const isCreator = (person) => response.order.purchaser === person

  const generateName = (person) =>
    isCreator(person) ? person + ' (Założyciel)' : person

  const mapOrderDetails = () =>
    response.order.orderDetails.map((order) => (
      <OrderRecord
        key={order.id}
        name={generateName(order.who)}
        order={order.what}
      />
    ))

  const showLoaderIfLoading = () => isLoading && <p>Ładowanie...</p>

  const showErrorIfError = () => error && <p>Error</p>

  return (
    <>
        <OrderBox>
        <TextDisplayer>
        {showLoaderIfLoading()}
        {showErrorIfError()}
          {response && 
          <>
            <OrderText
              title={response.order.restaurant}
              info={`Zamawia ${response.order.purchaser} - ${response.order.date} ${response.order.time}`}
            >
            {wantOrder ? 
            (
              <OrderFormik/>
            ):(<OrderList interested={response.order.interested}>
              {mapOrderDetails()}
            </OrderList>)}
            </OrderText>
            <ButtonWrapper>
              <Button text="Dołącz" handleOnClick={()=>setWantOrder(true)}/>
            </ButtonWrapper>
          </>}
          </TextDisplayer>
        </OrderBox> 
    </>
  )
}

export default OrderDetails
