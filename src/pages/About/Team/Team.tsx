import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";
import "./team.css";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Aditya Sahoo",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/300?img=11",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/300?img=12",
    },
    {
      id: 3,
      name: "Aman Verma",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/300?img=13",
    },
    {
      id: 4,
      name: "Priya Das",
      role: "Project Manager",
      image: "https://i.pravatar.cc/300?img=14",
    },
  ];

  return (
    <div className="team-page">
      {/* HERO SECTION */}
      <section className="team-hero">
        {/* VIDEO */}
        <video autoPlay muted loop playsInline preload="metadata" className="hero-video">
          <source
            src="https://videos.pexels.com/video-files/7989439/7989439-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* OVERLAY */}
        <div className="hero-overlay"></div>

        {/* CONTENT */}

        <div className="hero-content">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Team" }]} />
          <span className="tag">✨ Meet Our Creative Team</span>

          <h1>
            Passionate People <br />
            Behind Our Success
          </h1>

          <p>
            Our talented team works together to build innovative digital solutions and amazing user
            experiences for modern businesses worldwide.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Explore Team</button>

            <button className="secondary-btn">Join Us</button>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <div className="section-title">
          <span>Our Experts</span>

          <h2>Meet The Team</h2>

          <p>Professional and talented people dedicated to delivering exceptional results.</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />

                <div className="team-overlay">
                  <div className="social-icons">
                    <span>🌐</span>
                    <span>💼</span>
                    <span>📧</span>
                  </div>
                </div>
              </div>

              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="values-section">
        <div className="values-left">
          <span className="section-tag">Why Choose Us</span>

          <h2>
            Together We Build <br />
            Better Solutions
          </h2>

          <p>
            We believe teamwork, innovation, and creativity are the keys to building successful
            digital products and long-term business growth.
          </p>

          <div className="value-list">
            <div className="value-item">✅ Innovative Thinking</div>

            <div className="value-item">✅ Strong Team Collaboration</div>

            <div className="value-item">✅ Modern Technologies</div>

            <div className="value-item">✅ Scalable Architecture</div>
          </div>
        </div>

        <div className="values-right">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="team" />
        </div>
      </section>
    </div>
  );
};

export default Team;
