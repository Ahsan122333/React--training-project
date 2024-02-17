import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const { name, email, password } = values;
      // Perform your existing validation logic here
      if (!email || !password) {
        console.log("Please enter both email and password.");
        return;
      }
      // Rest of your existing logic goes here
      const existingDataString = localStorage.getItem("AllData");
      let existingData = [];
      if (existingDataString) {
        existingData = JSON.parse(existingDataString);
      }

      const newId = generateUniqueId(existingData.map((item) => item.userid));

      const data = { userid: newId, name, email, password };

      existingData.push(data);
      let updatedDataString = JSON.stringify(existingData);
      localStorage.setItem("AllData", updatedDataString);
      navigate("/");
    },
  });

  const generateUniqueId = (previousIds) => {
    if (previousIds.length === 0) {
      return 101; // Start with ID 101 if there are no previous IDs
    }

    const sortedIds = previousIds.sort((a, b) => a - b); // Sort the IDs as numbers
    const lastId = sortedIds[sortedIds.length - 1];
    const newId = Number(lastId) + 1; // Increment the highest ID by 1

    return newId;
  };

  return (
    <div className="main">
      <div className="inside">
        <h1>Signup</h1>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div className="SingleCredential">
            <input
              className="fields"
              type="text"
              name="name"
              value={formik.values.name}
              placeholder="Name"
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>
          <div className="SingleCredential">
            <input
              className="fields"
              type="email"
              name="email"
              value={formik.values.email}
              placeholder="Email"
              onChange={formik.handleChange}
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
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <br />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
