import React, { useState, ChangeEvent, FormEvent } from 'react'
import Counter from '../Counter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import SearchPage from './SearchPage';


interface FormData {
  name: string;
}

const Header = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<Product[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: ''
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const buttonHandler = async(event: FormEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    console.log(formData.name)
    navigate(`searchpage/${formData.name}`)
  }

  const logoutHandler = async(): Promise<void> => {
    const token = localStorage.getItem('token')
    // console.log(token)

    try {
      const logoutUser = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        }
      });

      const res = await logoutUser.json();
      if(res.success) {
        navigate('/logingeneral');
        localStorage.clear()
      }
    }
    catch(error) {
      console.log("Error: ", error)
    }

  }



  return (
      <div className="sticky top-0 z-50">
        <nav className='py-3 bg-blue-300'>
            <button onClick={() => navigate('/frontpage')} className='flex font-bold text-white text-4xl '>Nebula Nexus</button>
            <ul className='flex justify-end text-xl font-bold'>

              <div>
                <input 
                type='text'
                placeholder='Product Name'
                name='name'
                onChange={changeHandler}
                value={formData.name}
                />
                <button className='mx-3' onClick={buttonHandler}>Search</button>
              </div>

              {localStorage.getItem("role") === 'seller' ? <button onClick={() => navigate('/uploadproduct')} className='mx-8'>Upload Product</button> : <li></li>}


                <li className='mx-8 cursor-pointer' onClick={() => navigate('/frontpage')}>Home</li>
                <li className='mx-8 cursor-pointer' onClick={() => navigate('/bycategory')}>By Category</li>


                <li className='relative flex mx-2 cursor-pointer' onClick={() => navigate('/cart')}>
                  <Counter />  <FontAwesomeIcon icon={faCartShopping} /></li>

                  {
                    localStorage.getItem('role') === 'customer' ? <button onClick={() => navigate('/customerprofile')} className='mx-8'>Profile</button>: <li></li>
                  }

                  {
                    localStorage.getItem('role') 
                    ?
                    <button onClick={() => logoutHandler()} 
                    className='mx-8'>
                      Logout
                    </button>
                    : 
                    <button className='mx-8' onClick={() => navigate('/logingeneral')}>Log In</button>
                  }







            </ul>
        </nav>

        </div>
  )
}

export default Header
