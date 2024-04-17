import React, {useEffect, useState} from "react";
import axios from 'axios';
import apiCall from "./apiCall";
import { useNavigate } from "react-router-dom";

/***
 * 
 * This is the Login  screen that has a form where user enter details 
 * and it allow user to Login successfull if credentials are correct else show m,essages on error
 * by calling POST api using fetch request 
 */
function Login() {
    const [name,setName]= useState(null)
    const [password,setPassword]= useState(null)
    let navigate = useNavigate();

    const handleLogin=async()=>{
        const response= await apiCall("users/auth",JSON.stringify({name,password}), "POST","","")
        console.log(response)
        if(response.status=="ok"){
                localStorage.setItem("userData", JSON.stringify(response.data))
                localStorage.setItem("token", JSON.stringify(response.data.token))
                navigate("/user")
                window.location.reload();
        }else{
            alert(response.message)
        }
    }
    return (
        <div className="main mt-5 my-sm-5">
            <div className="container">
                <div className="row">
                <div className="col-lg-3 content-section"></div>
                    <div className="col-lg-6  block">
                        <div className="card-title">
                            <h1 className="fw-semibold text-md-start text-lg-start">Login Form</h1>
                         </div>
                            <div className="card-body">
                            <form>

                                <div class="form-outline mb-4">
                                <label class="form-label" for="name">User Name</label>
                                    <input type="text" id="name"  value={name} 
                                    onChange={(val)=>{setName(val.target.value)}} class="form-control" />
                                
                                </div>


                                <div class="form-outline mb-4">
                                    <label class="form-label" for="password">Password</label>
                                    <input type="password" id="password" class="form-control"  value={password} 
                                    onChange={(val)=>setPassword(val.target.value)} />

                                </div>


                                <div class="mt-3">
                                <button type="button"  class="btn btn-primary btn-block mb-5 " onClick={handleLogin}>Sign in</button>
                                </div>


                                </form>
                            </div>
                          
                            <div className="col-lg-3 content-section"></div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default Login;
