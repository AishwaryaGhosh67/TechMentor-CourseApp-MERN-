import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
    const [data, setdata] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const { authorizationToken, API } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    // get single users data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log(`users single data ${data}`);
            setdata(data);

            // if (response.ok) {
            //     getAllUsersData();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setdata({
            ...data,
            [name]: value,
        });
    };

    // to update the data dynamicaly
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Updated Successfully.");
                navigate("/admin/users"); // or your users list route

            } else {
                toast.error("Not Updated Data.");
            }

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
                                <h1>Update User data</h1>
                            </div>
                            {/* Now the update Form */}

                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username"
                                            placeholder="Enter Username" id="username"
                                            required autoComplete="off"
                                            value={data.username}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email"
                                            placeholder="Enter Email" id="email"
                                            required autoComplete="off"
                                            value={data.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input type="number" name="phone"
                                            placeholder="Enter phone" id="phone"
                                            required autoComplete="off"
                                            value={data.phone}
                                            onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )

};