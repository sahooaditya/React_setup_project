import { useState } from "react";
import users from "../../data/users.json";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import "./login.css";
import Space from "../../components/common/space";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      dispatch(
        loginSuccess({
          username: user.username,
          role: user.role as "admin" | "user",
        }),
      );

      // role based redirect
      // if (user.role === "admin") {
      //   navigate("/dashboard/admin");
      // } else {
      //   navigate("/dashboard/user");
      // }
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
      <Space size="lg" mobileSize="sm" />
      <div className="login-page">
        {/* BACK BUTTON */}
        <div className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft size={18} />
          <span>Back To Home</span>
        </div>
        <div className="login-container">
          {/* Left Side */}
          <div className="login-left">
            <h1>Welcome Back 👋</h1>
            <p>
              Login to continue accessing your dashboard, manage your profile, and explore amazing
              features.
            </p>

            <div className="login-image">
              <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="login" />
            </div>
          </div>

          {/* Right Side */}
          <div className="login-right">
            <div className="form-box">
              <h2>Login</h2>
              <p className="subtitle">Please enter your details</p>

              <form>
                {/* Email */}
                <div className="input-group">
                  <label>Email</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter your user name"
                  />
                </div>

                {/* Password */}
                <div className="input-group">
                  <label>Password</label>

                  <div className="password-box">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁"}
                    </span>
                  </div>
                </div>

                {/* Remember */}
                <div className="options">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <span className="forgot">Forgot Password?</span>
                </div>

                {/* Button */}
                <button onClick={handleLogin} className="login-btn">
                  Login
                </button>

                {/* Bottom */}
                <p className="bottom-text">
                  Don’t have an account? <span>Register</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
