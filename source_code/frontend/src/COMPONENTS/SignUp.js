import React, { useState } from "react";
import apiCall from "./apiCall";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    let navigate = useNavigate();

    const handleRegister = async () => {
        const response = await apiCall(
            "users",
            JSON.stringify({ name, password, bio }), // Include bio in the request payload
            "POST",
            "",
            ""
        );
        console.log(response);
        if (response.status === "ok") {
            alert(response.message);
            navigate("/login");
        } else {
            alert(response.message);
        }
    };

    return (
        <div className="main mt-5 my-sm-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 content-section"></div>
                    <div className="col-lg-6 block">
                        <div className="card-title">
                            <h1 className="fw-semibold text-md-start text-lg-start">SignUp Form</h1>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label">User Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="form-control"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        onClick={handleRegister}
                                        className="btn btn-primary btn-block mb-5"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 content-section"></div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
