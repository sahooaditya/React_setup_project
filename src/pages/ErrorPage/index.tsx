import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "80px" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" style={{ color: "#00bcd4" }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
