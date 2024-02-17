import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission
      const { email, password } = values;
      // Perform your existing validation logic here
      if (!email || !password) {
        console.log("Please enter both email and password.");
        return;
      }
      // Rest of your existing logic goes here
      const UserDataString = localStorage.getItem("AllData");
      let existingData = [];
      if (UserDataString) {
        existingData = JSON.parse(UserDataString);
      }
      for (let objData of existingData) {
        if (objData.email === email && objData.password === password) {
          alert("Sign-In Successful");
          console.log("Sign-In Successful");
          try {
            navigate("/posts"); // Omit optional second argument
          } catch (error) {
            console.log(error);
          }
          let updatedDataString = JSON.stringify(objData);
          localStorage.setItem("userData", updatedDataString);
          return;
        }
      }
      alert("Sign-In was Unsuccessful");
      console.log("Sign-In was Unsuccessful");
    },
  });

  return (
    <div className="main">
      <div className="inside">
        <h1>Login</h1>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div className="SingleCredential">
            <input
              className="fields"
              type="email"
              name="email"
              value={formik.values.email}
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="SingleCredential">
            <input
              className="fields"
              type="password"
              name="password"
              value={formik.values.password}
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <br />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <div>
          <h2>Don't have an account? Click on signup</h2>
        </div>
        <Link
          className="button"
          to="/signup"
          style={{
            textDecoration: "none",
            paddingLeft: "150px",
            paddingTop: "15px",
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
