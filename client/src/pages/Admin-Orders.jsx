import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllOrders = async () => {
    try {
      const response = await fetch(`${API}/api/admin/orders`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("Order API Response:", data);

      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders(data); // fallback if backend sends array directly
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <section className="admin-orders-section">
      <div className="container">
        <div className="admin-orders">
          <h1>Admin Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.user?.username}</td>
                  <td>{order.user?.email}</td>
                  <td>{order.service?.service}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.status}</td>
                  <td style={{ fontSize: "1.3rem" }}>{order.razorpay_payment_id}</td>
                  <td style={{ fontSize: "1.3rem" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
