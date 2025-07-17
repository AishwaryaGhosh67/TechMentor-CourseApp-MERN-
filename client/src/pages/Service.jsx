import { useAuth } from "../store/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Service = () => {
  const { services, user } = useAuth();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (price, serviceId) => {
    if (!user || !user._id) {
      toast.error("Please login to continue.");
      navigate("/login");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // ✅ Create order
      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/order",
        { amount: price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { amount, id: order_id, currency } = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_ID || "rzp_test_sdOZHV43sEFCdR",
        amount,
        currency,
        name: "TechMentor Course",
        description: "Payment for service",
        order_id,
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phone,
        },
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          const verifyRes = await axios.post(
            "http://localhost:5000/api/payment/verify",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              amount: price,
              serviceId: serviceId, // ✅ Fixed
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (verifyRes.data.success) {
            toast.success("✅ Payment Successful!");
          } else {
            toast.error("❌ Payment verification failed.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("💥 Payment error:", error);
      toast.error("Payment Failed. Check console.");
    }
  };

  return (
    <section className="section-services">
      <div className="container-services">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curEle, index) => {
          const { _id, service, description, price, provider } = curEle;

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img src="/images/HTML.png" alt="our services info" width="200" height="200" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>₹ {price}/-</p>
                </div>
                <h2>{service}</h2>
                <h2>{description}</h2>
              </div>
              <button
                type="button"
                className="btn btn-submit"
                onClick={() => handlePayment(price, _id)}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
