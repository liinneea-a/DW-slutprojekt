import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useContext, useState } from "react";
import * as yup from "yup";
import { UserContext } from "../../context/LoginContext";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

function RegisterForm() {
  const { postUser, setAdminRequest, adminRequest } = useContext(UserContext);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminRequest(event.target.checked);
  }; 

  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      adminRequest: adminRequest,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = {
        email: values.email,
        password: values.password,
        adminRequest: adminRequest
      };
      createNewUser(user);
      console.log(values);
    },
  });

  async function createNewUser(user: {}) {
    console.log(user);
    const newUser = await postUser(user);
    console.log(newUser);
    if (!newUser) {
      setAlreadyRegistered(true)
    } else {
      setAlreadyRegistered(false)
      setSuccessfullyRegistered(true)
    }
  }
  
  if (successfullyRegistered) return null;

  return (
    <form style={registerForm} onSubmit={formik.handleSubmit}>
      <h1>Register</h1>
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
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />

      Admin request
      <Checkbox {...label}  onChange={handleChange} />

      <p style={{ color: "red", fontSize: ".8rem" }}>
      {alreadyRegistered ? "That email is already in use." : undefined}
    </p>

      <Button
        style={nextButtonStyle}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;

const registerForm: CSSProperties = {
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "1rem",
  background: "#303339",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
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