import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();

    const URL = `${API}/api/auth/login`;


    // handling the input value
    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const res_data = await response.json();
                //store the token in server side
                storeTokenInLS(res_data.token);
                toast.success("Login Successful");
                console.log("Its is my user", user);
                // console.log("Its is my res user", res_data.isAdmin);
                console.log("Type of res_data.isAdmin:", typeof res_data.isAdmin, res_data.isAdmin);

                if (res_data.isAdmin) {
                    navigate("/admin/users");
                } else {
                    navigate("/");
                }

            }
            else {
                toast.error("Invalid Credentials");
            }
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/Login.png"
                                    alt="Lets fill the login Form"
                                    width="700" height="400"
                                />
                            </div>

                            {/* Lets Registration Page */}
                            <div className="login-form">
                                <h1 className="main-heading md-3">Login</h1>
                                <br /><br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email"
                                            placeholder="Enter Email" id="email"
                                            required autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input type="password" name="password"
                                            placeholder="Enter password" id="password"
                                            required autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};