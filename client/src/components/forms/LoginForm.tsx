import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContext";

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
});

function LoginForm() {
  const { loginUser, loggedInUser } = useContext(UserContext);

  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = {
        email: values.email,
        password: values.password,
      };
      handleLoginUser(user);
      console.log(values);
    },
  });

  async function handleLoginUser(user: {}) {
    console.log(user);
    const userToBeLoggedIn = await loginUser(user);
    console.log(userToBeLoggedIn);

    if (!userToBeLoggedIn) {
      setFailedLogin(true);
    } else {
      navigate("/all");
    }
  }

  return (
    <form style={loginForm} onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
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
      <p style={{ color: "red", fontSize: ".8rem" }}>
        {failedLogin ? "Wrong email or password" : undefined}
      </p>
      <Button
        style={nextButtonStyle}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;

const loginForm: CSSProperties = {
  width: "20rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "1rem",
  background: "#303339",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  height: "min-content",
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
