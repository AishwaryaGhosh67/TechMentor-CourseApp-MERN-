import { useAuth } from "../store/auth";

export const Service = () => {
    const { services } = useAuth();

    return (
        <section className="section-services">
            <div className="container-services">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">

                {services.map((curEle, index) => {
                    const { service, description, price, provider } = curEle;

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
                            <button type="submit" className="btn btn-submit">Buy Now</button>
                        </div>
                    );
                })}

            </div>
        </section>
    )
};