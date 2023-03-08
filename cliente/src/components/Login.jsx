import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
axios.defaults.withCredentials = true;
const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

const Login = () => {
    const myStorage = window.localStorage;
    const navigate = useNavigate();
    const valorInicial = {
        email: "foobar@example.com",
        password: "foobar",
    };

    const handleLogin = async (values, action) => {
        const { email } = values;
        try {
            const res = await axios.post(
                "http://localhost:8000/api/login",
                values
            );
            if (res.status === 200) {
                const result = await axios.post(
                    "http://localhost:8000/api/user",
                    {
                        email: email,
                    }
                );
                myStorage.setItem("user", JSON.stringify(result.data));
                const direccion = result.data.permit;
                if (direccion === "uni") {
                    navigate("generar");
                } else if (direccion === "guarda") {
                    navigate("scaner");
                } else {
                    console.log("Administrador");
                }
            }
            action.resetForm(valorInicial);
        } catch (error) {
            console.log(error);
        }
    };
    const formik = useFormik({
        initialValues: valorInicial,
        validationSchema: validationSchema,
        enableReinitialize: "true",
        onSubmit: handleLogin,
    });
    return (
        <div style={{ width: "40%", margin: "80px auto", height: "350px" }}>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Iniciar Session
                </Button>
            </form>
        </div>
    );
};

export default Login;
