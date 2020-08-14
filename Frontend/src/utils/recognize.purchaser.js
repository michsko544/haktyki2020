import { isLoggedUserPurchaser } from './is.logged.user.purchaser';
import { findPurchaser } from './find.purchaser';

export const recognizePurchaser = (userid, order) => {
    if (isLoggedUserPurchaser(userid, order)) {
      return 'Ty'
    } else {
      return findPurchaser(order).userFullname
    }
  }