import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layouts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminOrders } from "./pages/Admin-Orders";
import { useEffect } from "react";

const AppWrapper = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service" element={<Service />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Error />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminUsers />} />   {/* This shows when you go to /admin */}
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="users/:id/edit" element={<AdminUpdate />} />
                    <Route path="service" element={<Service />} />
                    <Route path="orders" element={<AdminOrders />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppWrapper />
        </BrowserRouter>
    );
};

export default App;
