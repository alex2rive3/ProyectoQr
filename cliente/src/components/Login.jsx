import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
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
        email: "",
        password: "",
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
                if (direccion === "universitario") {
                    navigate("generar");
                } else if (direccion === "guarda") {
                    navigate("scan");
                } else {
                    navigate("admin");
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
        <Paper
            elevation={3}
            sx={{
                width: "80%",
                height: "600px",
                padding: "10px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h5">
                <strong>Iniciar Session</strong>
            </Typography>
            <form
                style={{
                    width: "95%",
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
                    autoComplete="off"
                    label="Correo"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña"
                    autoComplete="off"
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
        </Paper>
    );
};

export default Login;
