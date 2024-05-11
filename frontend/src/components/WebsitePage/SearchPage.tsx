import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import ProductPage from './ProductPage';
import { useParams } from 'react-router-dom';


interface Product {
    name: string;
    description: string;
    cloudinaryUrl: string;
    id: string;
    price: string;
}


const SearchPage = () => {

    const {productname} = useParams<{ productname: string }>();

    const [data, setData] = useState<Product[]>([]);

    const fetchProducts = async(): Promise<void> => {
        try {
      const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/byname/${productname}`, {
        method: "GET",
      });

      const res = await savedUserResponse.json();
      console.log(res)

      setData(res.data);
    }
    catch(error) {
      console.log("Error: ", error)
    }
    }

    useEffect(() => {
        fetchProducts()
    }, [productname]);



    const paginationLogic = async(page: number, limit: number): Promise<void> => {
        try {
            const savedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/byname/${productname}?page=${page}&limit=${limit}`, {
                method: 'GET',
            });
            const res = await savedResponse.json();

            setData(res.data);
        }
        catch(error) {
            console.log("Error", error);
        }
    }


  return (

    <div>
        <ProductCard data={data} />

        <div className='flex justify-center'>
  <button className=" bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => paginationLogic(1, 5)}>1</button>

  <button className="mx-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => paginationLogic(2, 5)}>2</button>
  <button className="mx-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => paginationLogic(3, 5)}>3</button>
  <button className="mx-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => paginationLogic(4, 5)}>4</button>
  <button className="mx-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => paginationLogic(5, 5)}>5</button>
</div>

    </div>
  )
}

export default SearchPage;