import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService"; // import the authservice
import styles from "./SigninForm.module.css";
import LoginIcon from "../../assets/images/login.svg";

const SigninForm = (props) => {
  const navigate = useNavigate(); // added this for navigation purposes
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <section>
        <img src={LoginIcon} alt="Ask" />
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Log In</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SigninForm;
