import React from 'react';
import { useFetchUserProfile } from '../Customer/CustProfile'; // Corrected import

const CartQuantity: React.FC = () => {
    const [userDetail, fetchCustProfile] = useFetchUserProfile();

  return (
    <div>
        {userDetail?.cart?.length}
    </div>
  )
}

export default CartQuantity;