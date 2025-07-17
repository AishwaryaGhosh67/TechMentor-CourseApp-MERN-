import { NavLink } from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { ImHome } from "react-icons/im";
import { MdRoundaboutLeft } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { FaServicestack } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaRegistered } from "react-icons/fa";
import { TbLogin } from "react-icons/tb";


export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">TechMentor(Online Technical Course)</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/"><ImHome /> Home</NavLink ></li>
                            <li><NavLink to="/about"><MdRoundaboutLeft /> About</NavLink ></li>
                            <li><NavLink to="/contact"><IoMdContact /> Contact</NavLink ></li>
                            <li><NavLink to="/service"><FaServicestack /> Service</NavLink ></li>
                            {isLoggedIn ? (
                                <li><NavLink to="/logout"><MdLogout /> Logout</NavLink></li>
                            ) : (
                                <>
                                    <li><NavLink to="/register"><FaRegistered /> Register</NavLink ></li>
                                    <li><NavLink to="/login"><TbLogin /> Login</NavLink ></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}