import * as React from 'react';
import { CSSProperties, useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from '@mui/material';
import { UserContext } from '../context/LoginContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please provide a password")
    .min(6, "The password needs to be atleast 6 characters long.")
    .matches(/[A-Za-z0-9]/, "Password can only contain letter"),
    confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "The passwords need to match"),
});

function ProfilePage() {
  const { updateUser, isLoggedIn, loggedInUser} = useContext(UserContext);

console.log(loggedInUser._id)

  const formik = useFormik({
    initialValues: {
      email: loggedInUser.email,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = {
        email: values.email,
        password: values.password,
        id: loggedInUser._id,
      }
      updateUserInfo(user)
      console.log(values);
    },
  });

   async function updateUserInfo(user: any) {
    console.log(user)
    const userToBeLogedIn = await updateUser(user)
    console.log(userToBeLogedIn)} 





    return (
        <div style={loginPageLayout}>
          {/* <h1>Change your profile below</h1>
          <div style={tempFormLayout}>
          </div> */}
          <form style={loginForm} onSubmit={formik.handleSubmit}>
        <h1>Change account details</h1>
          <TextField
            style={textFieldStyle}
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
            <TextField
        style={textFieldStyle}
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
          
          <Button
            style={nextButtonStyle}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Update
          </Button>
      </form>
       <h1>Your orders:</h1>
          <div style={tempFormLayout}>
          </div> 
        </div>
    )
}

export default ProfilePage

const loginPageLayout: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem'
}

const tempFormLayout: CSSProperties = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center'
}

const loginForm: CSSProperties = {
  width: "30rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: '1rem',
  background: "#303339",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  height: 'min-content'
};

const textFieldStyle: CSSProperties = {
  marginBottom: "1rem",
  width: "80%",
  margin: ".5rem",
};

const nextButtonStyle: CSSProperties = {
  marginTop: "1rem",
  width: "10rem",
  background: "#2081e2",
  fontWeight: "bold",
};