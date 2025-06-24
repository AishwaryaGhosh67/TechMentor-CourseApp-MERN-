import { NavLink } from "react-router-dom";

export const Error = () => {
    return (
        <section id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h3>Sorry! Page not found</h3>
                <p>
                    Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted, or the URL may be incorrect.
                    Please check the address or go back to the homepage. If the problem continues, feel free to contact our support team for help.
                </p>
                <div className="btns">
                    <NavLink to="/">Return Home</NavLink>
                    <NavLink to="/contact">Report Problem</NavLink>
                </div>
            </div>
        </section>
    );
};
