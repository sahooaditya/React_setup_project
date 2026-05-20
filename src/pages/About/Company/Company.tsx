import "./company.css";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";

const Company = () => {
  return (
    <div className="company-page">
      {/* HERO SECTION */}
      <section className="company-hero">
        {/* VIDEO */}
        <video autoPlay muted loop playsInline preload="metadata" className="hero-video">
          <source
            src="https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div className="overlay"></div>

        {/* CONTENT */}
        <div className="hero-content">
          {/* BREADCRUMB */}
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Company" }]} />

          <h1>
            Building Digital <br />
            Experiences For The Future
          </h1>

          <p>
            We create innovative and scalable digital solutions that help businesses grow faster
            with modern technology and creative design.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Explore More</button>

            <button className="secondary-btn">Contact Us</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-company">
        <div className="about-left">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="team" />
        </div>

        <div className="about-right">
          <span className="section-tag">About Company</span>

          <h2>We Build Smart Solutions For Modern Businesses</h2>

          <p>
            Our company focuses on delivering high-quality web applications, scalable systems, and
            modern UI/UX experiences that help startups and enterprises succeed in the digital
            world.
          </p>

          <div className="company-features">
            <div className="feature-box">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>

            <div className="feature-box">
              <h3>500+</h3>
              <p>Projects Completed</p>
            </div>

            <div className="feature-box">
              <h3>120+</h3>
              <p>Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="section-title">
          <span>Our Services</span>

          <h2>What We Provide</h2>
        </div>

        <div className="service-grid">
          <div className="service-card">
            <div className="icon">💻</div>

            <h3>Web Development</h3>

            <p>
              Modern and scalable web applications using React, Next.js and latest technologies.
            </p>
          </div>

          <div className="service-card">
            <div className="icon">📱</div>

            <h3>Mobile Apps</h3>

            <p>High-performance mobile applications with modern user experiences.</p>
          </div>

          <div className="service-card">
            <div className="icon">☁️</div>

            <h3>Cloud Solutions</h3>

            <p>Secure cloud infrastructure and scalable deployment solutions for businesses.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
