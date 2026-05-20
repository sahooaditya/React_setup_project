import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        <div className="spinner"></div>

        <h2>Loading...</h2>

        <p>Please wait</p>
      </div>
    </div>
  );
};

export default Loader;
