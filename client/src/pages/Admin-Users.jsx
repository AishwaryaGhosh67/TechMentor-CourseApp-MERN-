import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUsers = () => {
    const [users, setusers] = useState([]);

    const { authorizationToken, API, user } = useAuth(); // includes current logged-in user

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setusers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id, email) => {
        // Prevent self-deletion
        if (user?.email === email) {
            toast.warning("You cannot delete your own admin account.");
            return;
        }

        try {
            const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();

            if (response.ok) {
                getAllUsersData();
                toast.success("User Deleted Successfully.");
            } else {
                toast.error("Oops! User not deleted.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <section className="admin-users-section">
                <h1 style={{ textAlign: "center", fontSize: "2.7rem" }}>All Users Data</h1>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        <Link to={`/admin/users/${curUser._id}/edit`} className="updateLink">
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        {user?.email === curUser.email ? (
                                            <button className="deleteLink" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                                                Can't Delete
                                            </button>
                                        ) : (
                                            <button className="deleteLink" onClick={() => deleteUser(curUser._id, curUser.email)}>
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
