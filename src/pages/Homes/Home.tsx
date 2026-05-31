import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiLock,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import "./home.css";
import Container from "../../components/common/Container";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FiZap />,
    title: "Lightning Workflow",
    text: "Fast routing, clean state management, and smooth UI patterns built for daily product work.",
  },
  {
    icon: <FiLock />,
    title: "Secure Access",
    text: "Role-ready flows, guarded pages, and predictable dashboard access from the first login.",
  },
  {
    icon: <FiLayers />,
    title: "Polished Components",
    text: "Reusable cards, layouts, and surfaces that stay sharp across desktop, tablet, and mobile.",
  },
];

const stats = [
  { value: "10K+", label: "Active users" },
  { value: "99%", label: "Performance score" },
  { value: "24/7", label: "Support rhythm" },
  { value: "100+", label: "Projects shipped" },
];

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker, .hero-title, .hero-copy, .hero-actions", {
          opacity: 0,
          y: 34,
          duration: 0.85,
          stagger: 0.11,
        })
        .from(
          ".hero-visual",
          {
            opacity: 0,
            y: 44,
            rotateX: 10,
            duration: 0.95,
          },
          "-=0.55",
        )
        .from(
          ".orbit-pill",
          {
            opacity: 0,
            scale: 0.82,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.45",
        );

      gsap.to(".parallax-shape.one", {
        yPercent: 28,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-shape.two", {
        yPercent: -24,
        xPercent: 10,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 46,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
          },
        });
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 34,
        scale: 0.94,
        duration: 0.72,
        stagger: 0.08,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".stats",
          start: "top 82%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home" ref={pageRef}>
      <section className="hero">
        <div className="parallax-shape one" />
        <div className="parallax-shape two" />

        <Container>
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-kicker">
                <FiCpu /> Modern React Dashboard
              </span>

              <h1 className="hero-title">
                Build faster dashboards with motion that feels premium.
              </h1>

              <p className="hero-copy">
                A clean TypeScript React experience with animated product sections, responsive
                layouts, and elegant parallax depth for a stronger first impression.
              </p>

              <div className="hero-actions">
                <Link to="/login" className="primary-btn">
                  Get Started <FiArrowRight />
                </Link>

                <Link to="/service" className="secondary-btn">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-label="Dashboard preview">
              <div className="dashboard-shell">
                <div className="dashboard-topbars">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="dashboard-body">
                  <div className="analytics-card main">
                    <div>
                      <small>Revenue pulse</small>
                      <strong>86.4%</strong>
                    </div>
                    <FiTrendingUp />
                  </div>

                  <div className="chart-panel">
                    <span style={{ height: "42%" }} />
                    <span style={{ height: "74%" }} />
                    <span style={{ height: "58%" }} />
                    <span style={{ height: "88%" }} />
                    <span style={{ height: "66%" }} />
                  </div>

                  <div className="task-panel">
                    <p>
                      <FiCheckCircle /> Authentication ready
                    </p>
                    <p>
                      <FiCheckCircle /> Redux toolkit wired
                    </p>
                    <p>
                      <FiCheckCircle /> Responsive UI system
                    </p>
                  </div>
                </div>
              </div>

              <div className="orbit-pill top">
                <FiBarChart2 />
                Live insights
              </div>
              <div className="orbit-pill bottom">
                <FiZap />
                Smooth GSAP
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="features">
        <Container>
          <div className="section-title gsap-reveal">
            <span>Why choose us</span>
            <h2>Everything feels fast, focused, and alive.</h2>
            <p>Designed for modern apps where the landing page and dashboard both need polish.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card gsap-reveal" key={feature.title}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="experience">
        <Container>
          <div className="experience-grid">
            <div className="experience-copy gsap-reveal">
              <span>Parallax design</span>
              <h2>Layered sections that move with the scroll.</h2>
              <p>
                GSAP ScrollTrigger adds soft depth, reveal timing, and visual momentum without
                making the page feel heavy.
              </p>
            </div>

            <div className="timeline-card gsap-reveal">
              <div>
                <strong>01</strong>
                <p>Hero animation loads with a cinematic dashboard preview.</p>
              </div>
              <div>
                <strong>02</strong>
                <p>Cards reveal as users move through the page.</p>
              </div>
              <div>
                <strong>03</strong>
                <p>CTA closes with a confident, conversion-focused finish.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="stats">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>
      </Container>

      <section className="cta gsap-reveal">
        <Container>
          <div className="cta-inner">
            <span>Ready to launch</span>
            <h2>Give your React project a premium first screen.</h2>
            <p>
              Start from the login flow or explore the service pages with a stronger visual story.
            </p>
            <Link to="/login" className="cta-btn">
              Login Now <FiArrowRight />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
