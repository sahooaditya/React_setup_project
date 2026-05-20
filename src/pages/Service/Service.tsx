import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import "./service.css";

const ServicePage = () => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      desc: "Modern responsive websites using React, Next.js and TypeScript.",
      icon: "💻",
    },
    {
      id: 2,
      title: "UI/UX Design",
      desc: "Clean and modern user interface with smooth user experience.",
      icon: "🎨",
    },
    {
      id: 3,
      title: "App Development",
      desc: "Fast and scalable mobile applications for all platforms.",
      icon: "📱",
    },
    {
      id: 4,
      title: "SEO Optimization",
      desc: "Improve search rankings and grow your online visibility.",
      icon: "🚀",
    },
    {
      id: 5,
      title: "Cloud Services",
      desc: "Secure cloud deployment and server management solutions.",
      icon: "☁️",
    },
    {
      id: 6,
      title: "Digital Marketing",
      desc: "Powerful marketing strategies for business growth.",
      icon: "📈",
    },
  ];

  return (
    <div className="service-page">
      {/* HERO SECTION */}
      <section className="service-hero">
        {/* VIDEO */}
        <video autoPlay muted loop playsInline preload="metadata" className="hero-video">
          <source
            src="https://videos.pexels.com/video-files/3195650/3195650-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div className="overlay"></div>

        {/* CONTENT */}
        <div className="service-content">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "service" }]} />
          <p className="small-text">OUR SERVICES</p>

          <h1>
            We Build Modern
            <span> Digital Solutions</span>
          </h1>

          <p className="hero-desc">
            We help businesses grow with powerful web applications, creative UI/UX, scalable systems
            and modern technologies.
          </p>

          <div className="service-buttons">
            <button className="primary-btn">Explore Services</button>

            <button className="secondary-btn">Contact Us</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="section-title">
          <p>SERVICES</p>
          <h2>What We Provide</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>

              <button>Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <div className="why-left">
          <p className="tag">WHY CHOOSE US</p>

          <h2>
            Delivering High Quality
            <span> Digital Experiences</span>
          </h2>

          <p>
            We combine creativity, technology and innovation to create impactful digital products
            for businesses.
          </p>

          <div className="why-list">
            <div>✔ Modern UI Design</div>
            <div>✔ Responsive Development</div>
            <div>✔ SEO Friendly</div>
            <div>✔ Fast Performance</div>
          </div>
        </div>

        <div className="why-right">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="team"
          />
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
