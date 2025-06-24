export const Home = () => {
    return (
        <>
            <main>
                {/* 1st section */}
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>From Zero to Tech Hero</p>
                            <h1>Welcome to TechMentor Courses</h1>
                            <p>🚀 Master Future-Ready Skills, One Click at a Time Start your journey into the world of technology
                                with expertly curated courses. Learn coding, cloud, AI, and more—anytime, anywhere.
                                Whether you're starting from scratch or upgrading your skills, we’ve got your back. With bite-sized lessons, live mentorship
                                and project-based learning, you're not just watching—you’re doing.

                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Connect Now</button>
                                </a>
                                <a href="/service">
                                    <button className="btn secondary-btn">Learn More</button>
                                </a>
                            </div>
                        </div>

                        {/* Hero images */}

                        <div className="hero-image">
                            <img src="/images/Home1.jfif" alt="coding together" width="550" height="450" />
                        </div>
                    </div>
                </section>
            </main>

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

            {/* 3rd section */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* Hero images */}

                    <div className="hero-image">
                        <img src="/images/Home2.jfif" alt="coding together" width="450" height="350" />
                    </div>

                    <div className="hero-content">
                        <p>We're With You Every Step of the Way</p>
                        <h1>Begin Your Tech Journey Today!</h1>
                        <p>🌟 Unlock Your Potential in Tech—The Smart Way
                            Dive into cutting-edge skills with courses designed for the next generation of developers and tech professionals. From beginner to advanced, we offer practical, hands-on learning in coding, cloud computing, AI, and beyond.
                            No fluff. Just real learning with interactive projects, live expert guidance, and lessons that fit your schedule. Learn at your pace, build real-world projects, and become job-ready—starting now.
                        </p>
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
        </>
    )
};