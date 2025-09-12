import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllStores } from '../../../../services/operations/storeApi';

const UserStores = () => {

  const [storedata, setStoreData] = useState([]);

  const dispatch = useDispatch();

  // api calling
  useEffect(()=>{
    const getAllStoresData = async ()=>{
      const response = await dispatch(getAllStores());
      console.log("Printing the store data -->", response);
      if(response){
        setStoreData(response);
      }
    }

    getAllStoresData();

  },[])


  return (
    <div>
      <h1> All Stores Are Here !! </h1>

      <div>
        {
          storedata.length > 0 ? storedata.map((store,index)=>(
            <div key={index} className='border p-8 mt-10 rounded-lg hover:scale-105 transition-all delay-100 flex-wrap w-fit shadow-lg '>
              <p> {store.name}</p>
              <p> {store.address}</p>
              <p>
                Store Id :-
                {
                  store.id
                }
              </p>

                {/* Create Rating components here */}
              <div>
                Rating -- Star components 
              </div>

            </div>
          )) :(<div>
            No Stores Are Available 
          </div>)
        }
      </div>
    </div>
  )
}

export default UserStores