import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();

    const URL = `${API}/api/auth/register`;


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
        console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            // console.log("res from server", res_data);

            if (response.ok) {
                //store the token in server side
                storeTokenInLS(res_data.token);
                toast.success("Registration Successful");
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                navigate("/")
            }
            else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            // console.log(response);

        } catch (error) {
            console.log("register", error);
        }

    };


    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/Registration.jfif"
                                    alt="a girl is trying to do registration"
                                    width="600" height="400"
                                />
                            </div>

                            {/* Lets Registration Page */}
                            <div className="registration-form">
                                <h1 className="main-heading md-3">Registration</h1>
                                <br /><br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username"
                                            placeholder="Enter username" id="username"
                                            required autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email"
                                            placeholder="Enter email" id="email"
                                            required autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input type="number" name="phone"
                                            placeholder="Enter phone" id="phone"
                                            required autoComplete="off"
                                            value={user.phone}
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
                                    <button type="submit" className="btn btn-submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};