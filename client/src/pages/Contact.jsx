import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactForm = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {

    const [contact, setContact] = useState(defaultContactForm);

    const [userData, setUserData] = useState(true);

    const { user, API } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }

    // handling the input value
    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${api}/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setContact(defaultContactForm);
                toast.success("Message send successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Message Not send.");
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <h1>Contact Us</h1>
                                <br />
                                <img src="/images/Contact.jfif"
                                    alt="Lets fill the Contact Form"
                                    width="700" height="500"
                                />
                            </div>
                            {/* Now the contact Form */}

                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username"
                                            placeholder="Enter Username" id="username"
                                            required autoComplete="off"
                                            value={contact.username}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email"
                                            placeholder="Enter Email" id="email"
                                            required autoComplete="off"
                                            value={contact.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            name="message"
                                            placeholder="Write Your Message here"
                                            id="message"
                                            required
                                            autoComplete="off"
                                            value={contact.message}
                                            onChange={handleInput}
                                        ></textarea>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <section>
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=86.945%2C23.703%2C86.947%2C23.705&layer=mapnik&marker=23.7039%2C86.9464"
                        style={{ width: "100%", height: "200px", border: "0" }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </section>
            </section>
        </>
    )
};