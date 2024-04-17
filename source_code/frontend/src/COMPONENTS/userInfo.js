import React, {useEffect, useState} from "react";
/***
 * 
 * This is the profile screen that display the user information
 * and allows user to edit profile details
 * by calling put api using fetch request 
 */

function UserProfile() {
    
    useEffect(()=>{
        setData ( JSON.parse( localStorage.getItem("userData")))
    },[])
    const [image,setImage]= useState(null)
        const [data, setData] = useState({
        name:"",
        bio:"",
        url:"https://via.placeholder.com/300x300"
        })

const [edit,isEdit]= useState(false)

const handleEditClick=()=>{
    
    isEdit(!edit)
}
const handleSaveClick=async(e)=>{
    e.preventDefault();
    isEdit(!edit)
    console.log(data)
    const fd = new FormData()
    // this line gives an error
    fd.append('image', image)
    fd.append('name', data.name)
    fd.append("bio",data.bio)
    fd.append("_id", data._id)

    fetch(`http://localhost:3002/users`,
    {
      method:"PUT", 
      body:fd,
    }
    ).then(res=> res.json()).then(data=>{
      console.log(data)
      if(data.status == "ok" && data !=null){
        setData(data.data)
        localStorage.setItem("userData", JSON.stringify(data.data))
      }
    }).
    catch(error=>alert(error))
   
}
const handleuploadImage=({target})=>{
console.log("--->",target.files[0])
setImage(target.files[0])
}

    return (
        <div className="main mt-5 my-sm-5">
            <div className="container">
                <div className="row">
                    {/* <button>Edit Profile</button> */}
                    <div className="col-lg-3">
                        <div className="card-img">
                          <img src={data.image!= undefined ? data.image  : "https://via.placeholder.com/300x300"}  width={'300'} height={'300'} className="img-thumbnail" alt="" />
                        </div>
                      {/* {edit &&  <div className="mb-3 ">
                              <input type="file" id="myFile"
                              accept=".png, .jpg, .jpeg"
                               name="filename" onChange={handleuploadImage}  class="btn btn-info btn-sm btn-floating float-end"/>    
                            </div>} */}
                    </div>
                    
                    <div className="col-lg-9 ">
                        <div className="card-body block">
                            <div className="mb-2">
                            <label class="form-label" for="name">Name</label>
                                <input  class="form-control" value={data.name} 
                                
                                onChange={(event)=>{
                                    setData({...data,name:event.target.value})
                                }}
                                disabled={!edit} />
                            </div>
                            <div className="mb-2">
                            <label class="form-label" for="bio">Bio</label>
                                <input  class="form-control" value={data.bio} 
                                 onChange={(event)=>{
                                    setData({...data,bio:event.target.value})
                                }}
                                disabled={!edit}/>
                            </div>
                            <div className="mb-3 ">
                                 <button class="btn btn-primary btn-sm btn-floating float-end" onClick={!edit ? handleEditClick : handleSaveClick}>
                                     {edit ? "Save" : "Edit Profile" }
                                </button> 
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UserProfile;
