import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginGeneral = () => {
    const navigate = useNavigate();

  return (
    <div>

          <p className='my-[50px] flex justify-center text-2xl '>Login</p>
        <div className='flex justify-center my-[50px]'>
        <button onClick={() => navigate('/loginseller')} className='mx-4 px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring'>Seller</button>
        <button onClick={() => navigate('/logincustomer')} className='mx-4 px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring'>Customer</button>
        </div>


      <div className='my-[250px]'>
        <p className='my-[50px] flex justify-center text-2xl '>Signup</p>
        <div className='flex justify-center my-[50px]'>
        <button onClick={() => navigate('/signupseller')} className='mx-4 px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring'>Seller</button>
        <button onClick={() => navigate('/signupcustomer')} className='mx-4 px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring'>Customer</button>
        </div>
      </div>

    </div>
  )
}

export default LoginGeneral