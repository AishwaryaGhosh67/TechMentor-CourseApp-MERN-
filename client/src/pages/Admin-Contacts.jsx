import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";

export const AdminContacts = () => {

    const [contactData, setContactData] = useState([]);
    const { authorizationToken, API } = useAuth();

    const getContactsData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // delete the user message on delete button
    const deleteUserMessage = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getContactsData();
                toast.success("Deleted Successfully.");
            }
            else {
                toast.error("Sorry! Not Deleted");
            }
        } catch (error) {
            console.log(error);
        }
        // console.log(id);
    };

    useEffect(() => {
        getContactsData();
    }, []);
    return (
        <>
            <section className="admin-contacts-section">
                <h1>Admin Contact Data</h1>

                <div className="container admin-contacts">
                    <table>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactData.map((curContactData, index) => {
                                const { username, email, message, _id } = curContactData;
                                return (
                                    <tr key={index}>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                        <td>{message}</td>
                                        <td>
                                            <button className="deleteBtn" onClick={() => deleteUserMessage(_id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );

};