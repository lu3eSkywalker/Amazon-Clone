import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchUserProfile } from '../Customer/CustProfile';
import { useCartQuantityHook } from './JustTesting';

const OrderPage = () => {

    const navigate = useNavigate()
    const custId = localStorage.getItem('userId');
    const {productId} = useParams();
    const [userDetail, fetchCustProfile] = useFetchUserProfile();
    const [itemPrice, setItemPrice] = useState();

    console.log(userDetail?.address)

    useEffect(() => {
        getProductInfo()
    }, [])

    const getProductInfo = async(): Promise<void> => {
        try {
            const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getproductbyid/${productId}`, {
                method: "GET",
            });
            const res = await savedUserResponse.json();
            console.log(res.data[0].price);
            setItemPrice(res.data[0].price);
        }
        catch(error) {
            console.log("Error: ", error)
        }
    }



  return (
    <div>
        <div>
            <p>Name: {userDetail?.name} </p>
            <p>Address: {userDetail?.address}</p>
            <p>Order Total: {itemPrice}</p>
        </div>

        <div>
            <button onClick={() => navigate('/orderplaced')}>Order Confirm</button>
        </div>
    </div>
  )
}

export default OrderPage