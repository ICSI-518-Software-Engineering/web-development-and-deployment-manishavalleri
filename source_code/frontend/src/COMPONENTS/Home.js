import React, {useEffect, useState} from "react";
import axios from 'axios';
import apiCall from "./apiCall";

function Home() {
  const [allUsers,setAllUsers]= useState([])
  useEffect(()=>{

    
   const fetchData=async()=>{
     const response = await apiCall("users",null, "GET","","")
     console.log(response)
     if(response.status == "ok") setAllUsers(response.data)
    }

    fetchData();

  },[])
const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


    return (
        <div className="main mt-5 my-sm-5">
             <div className="container mt-5">
                <div className="row">
                  <div className="col">
                  	<h2>All users </h2>
                  </div>
                </div>
            </div>

         {allUsers.map(user => (
          <div className="container">
          <div className="row">
              <div className="col-lg-3">
                  <div className="card-img">
                    <img src={user.image!= undefined ? user.image  : "https://via.placeholder.com/300x300/300.png"} className="img-thumbnail" alt="" />
                  </div>
              </div>
              <div className="col-lg-9 content-section">
                  <div className="card-title">
                      <h1 className="fw-semibold text-md-start text-lg-start">{user.name}</h1>
                      {user.bio != undefined &&   <p className=" fs-6">{user.bio}</p>}
                  </div>
              </div>
          </div>
          <hr />
        </div>
         ))   }
		
         

            
        </div>
    )
}

export default Home;
