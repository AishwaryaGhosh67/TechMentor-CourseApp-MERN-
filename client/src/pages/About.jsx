import { useAuth } from "../store/auth";

export const About = () => {

    const { user } = useAuth();

    return (
        <>
            <main>
                {/* 1st section */}
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-image">
                            <img src="/images/About.jfif" alt="coding together" width="550" height="450" />
                        </div>
                        <div className="hero-content">
                            <p>
                                Hii,
                                {user ? ` ${user.username}, thank you to choose us` : ` let's choose us`}
                            </p>
                            <h1>Welcome to TechMantor</h1>
                            <p>
                                At <strong>TechMantor</strong>, we’re not just another course platform—we’re your launchpad into the world of technology.
                                Built by tech lovers for future innovators, we blend hands-on projects, real-world tools, and mentor-guided learning
                                to turn curiosity into confidence.
                                Want to build apps, crack coding interviews, or explore AI? You’re in the right place. Our bite-sized lessons fit
                                into your schedule, and our 24/7 support ensures help is never far away. Whether you're starting fresh or
                                upskilling for your dream job, we’ve got your back.
                                <br />
                                Learning here isn’t passive—you’ll create, build, break, fix, and grow. So take that first step, power up your skills,
                                and join thousands who are turning passion into profession.
                            </p>
                            <p><strong>Let’s build the future. One line of code at a time.</strong></p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Connect Now</button>
                                </a>
                                <a href="/service">
                                    <button className="btn secondary-btn">Learn More</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2nd section */}
                <section className="section-analytics">
                    <div className="container grid grid-four-cols">
                        <div className="div1">
                            <h2>50+</h2>
                            <p>register courses</p>
                        </div>
                        <div className="div1">
                            <h2>100,00+</h2>
                            <p>Happy Students</p>
                        </div>
                        <div className="div1">
                            <h2>500+</h2>
                            <p>Registered students</p>
                        </div>
                        <div className="div1">
                            <h2>24/7</h2>
                            <p>service</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
};