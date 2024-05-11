import React, { useEffect, useState, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';  
import Cart from './Cart';
import { useFetchUserProfile } from '../Customer/CustProfile';
import { useCartQuantityHook } from './JustTesting';



const FullCartOrder = () => {
    const navigate = useNavigate();
    const [cartTotal, setCartTotal] = useState(0);
    const [userDetail, fetchCustProfile] = useFetchUserProfile();


    const custId = localStorage.getItem('userId');
    const userId = localStorage.getItem('userId');



    const orderTotal = async (): Promise<void> => {
        const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/custprofile/${userId}`, {
            method: 'GET',
        });

        const res = await savedUserResponse.json();
        const cartMapping = res.data.cart;

        let totalPrice: number = 0;

        await Promise.all(cartMapping.map(async (dataItem: number) => {
            const productPriceResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getproductbyid/${dataItem}`, {
                method: 'GET',
            });

            const productData = await productPriceResponse.json();
            const price = Number(productData.data.price); // Convert price to number

            console.log(price); // Log individual product price

            totalPrice += price; // Add current product price to total price
        }));

        console.log('Total Price:', totalPrice);
        setCartTotal(totalPrice);
    }



    useEffect(() => {
        orderTotal();
    }, [])


    



    const orderConfirm = async(): Promise<void> => {
        try {
            const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/custprofile/${userId}`, {
                method: 'GET',
            })

            const res = await savedUserResponse.json();

            const cartMapping = res.data.cart;

            cartMapping.map(async(dataItem: number) => {
                try {
                    const info = {
                        custId: parseInt(userId || 'O'),
                        prodId: dataItem,
                        status: "pending"
                    };
                    const orderStatusFunction = await fetch(`${process.env.REACT_APP_BASE_URL}/createorder`, {
                        method: 'Post',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info)
                    });
                    const res = await orderStatusFunction.json();
                    console.log(res)
                    
                }
                catch(error) {
                    console.log("Error: ", error)
                }
            })
            navigate('/orderplaced');
        }
        catch(error) {
            console.log("Error: ", error)
        }
    }




    const checkOut = async(): Promise<void> => {
        try {
          const deleteCart = await fetch(`${process.env.REACT_APP_BASE_URL}/deletewholecart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({custId})
          })
  
          const res = await deleteCart.json();
          navigate('/orderplaced')
        }
        catch(error) {
            console.log("Error: ", error)
        }
      }


  


    return (
        <div>

            <div>
                <p className='font-bold text-xl'>Info for Delivering</p>
                <p>{userDetail?.name}</p>
                <p>{userDetail?.address}</p>
                <p>{userDetail?.email}</p>

            </div>


        <div>Total Order PricePrice: ${cartTotal}</div>
        <br></br>
        <br></br>

        {/* <button onClick={() => checkOut()}>Checkout</button> */}




        <button onClick={() => orderConfirm()}>Order Confirm</button>
    </div>
    )
  
};

export default FullCartOrder;