import { recognizePurchaser } from './recognize.purchaser';
import { isOrderClosed } from './is.order.closed';

export const displayPurchaser = (userid, order) => {
    const who = recognizePurchaser(userid, order)
    if (!isOrderClosed(order)) {
      return who === 'Ty' ? `Zamawiasz ${who}` : `Zamawia ${who}`
    } else {
      return who === 'Ty' ? `Zamawiałeś/aś ${who}` : `Zamawiał/a ${who}`
    }
  }