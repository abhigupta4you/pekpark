
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {


  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          // Handle array response
          setUserData(response.data.products); // Display 
        } else if (typeof response.data === 'object') {
          // Handle object response
          const userDataArray = Object.values(response.data.products);
          setUserData(userDataArray); // Display the first 3 users
        } else {
          console.error('API response is not an array or object:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //const setData = (user) => {
  // console.log(user);
  ///}
  const increaseStock = (userId) => {
    // Find the user by ID in the userData array
    const updatedUserData = userData.map((user) => {
      if (user.id === userId) {
        // Increase the stock
        return { ...user, stock: user.stock + 1 };
      }
      return user;
    });

    // Update the state and send a PUT request to the API to update the stock
    setUserData(updatedUserData);
    updateStockOnAPI(userId, updatedUserData.find((user) => user.id === userId).stock);
  };

  const decreaseStock = (userId) => {
    // Find the user by ID in the userData array
    const updatedUserData = userData.map((user) => {
      if (user.id === userId && user.stock > 0) {
        // Decrease the stock
        return { ...user, stock: user.stock - 1 };
      }
      return user;
    });

    // Update the state and send a PUT request to the API to update the stock
    setUserData(updatedUserData);
    updateStockOnAPI(userId, updatedUserData.find((user) => user.id === userId).stock);
  };

  const updateStockOnAPI = (userId, newStock) => {
    // Send a PUT request to the API to update the stock
    axios.put(`https://dummyjson.com/products/${userId}`, { stock: newStock })
      .then(() => {
        console.log(`Stock updated for user with ID ${userId}`);
      })
      .catch((error) => {
        console.error(`Error updating stock for user with ID ${userId}:`, error);
      });
  };

 

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <div class="container px-5 py-5 mx-auto">

              <div class="flex   ">

                <div class="p-4 md:w-1/3 flex  ">
                  <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={user.thumbnail} alt="blog" />
                    <div class="p-6">
                      <h2 class="tracking-widest text-lg title-font font-bold text-black mb-1">Price  {user.price}</h2>
                      <h1 class="title-font text-xs font-medium text-gray-900 mb-3"> Discount : {user.discountPercentage} %</h1>
                      <p class="leading-relaxed mb-3">{user.description}</p>
                      <div class="flex items-center flex-wrap"> <button onClick={() => increaseStock(user.id)} className='p-2 m-2 bg-slate-400 rounded-xl'>+</button>

                        <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"> Quantity {user.stock}

                        </a>
                        <button onClick={() => decreaseStock(user.id)} className='p-2 bg-slate-400 m-2 rounded-xl'>-</button>
                      
                      </div>  
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;