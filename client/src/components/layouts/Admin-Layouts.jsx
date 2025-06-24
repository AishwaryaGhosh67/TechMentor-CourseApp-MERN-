import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../store/auth";
import { MdLogout } from "react-icons/md";

export const AdminLayout = () => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }
    return (
        <>
            <header>
                <div>
                    <nav>
                        <ul>
                            <li><NavLink to="/admin"><IoHome /> Home</NavLink></li>
                            <li><NavLink to="/admin/users"><FaUserAlt /> users</NavLink></li>
                            <li><NavLink to="/admin/contacts"><RiContactsBook2Fill /> contacts</NavLink></li>
                            <li><NavLink to="/admin/service"><FaServicestack /> services </NavLink></li>       
                             <li><NavLink to="/logout"><MdLogout /> Logout</NavLink></li>                     
                        </ul>
                    </nav>
                </div>
            </header>
            <h1>Welcome Admin!</h1>
            <Outlet></Outlet>
        </>
    )
};