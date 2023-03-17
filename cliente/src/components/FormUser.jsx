import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Box } from "@mui/material";
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

const FormUser = ({ initialValues, botonTexto, onSubmit }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: "true",
        onSubmit: onSubmit,
    });
    return (
        <Box sx={{ width: "80%", padding: "10px", margin: "0 auto" }}>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    autoComplete="off"
                    id="userName"
                    name="userName"
                    label="Nombre de Usuario"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                    }
                    helperText={
                        formik.touched.userName && formik.errors.userName
                    }
                />
                <TextField
                    fullWidth
                    id="email"
                    autoComplete="off"
                    name="email"
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
                <TextField
                    fullWidth
                    id="permit"
                    autoComplete="off"
                    name="permit"
                    select
                    label="Permiso"
                    type="permit"
                    value={formik.values.permit}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.permit && Boolean(formik.errors.permit)
                    }
                    helperText={formik.touched.permit && formik.errors.permit}
                >
                    <MenuItem value={"universitario"}> Universitario</MenuItem>
                    <MenuItem value={"guarda"}>Guarda</MenuItem>
                    <MenuItem value={"administrador"}> Administrador</MenuItem>
                </TextField>

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    {botonTexto}
                </Button>
            </form>
        </Box>
    );
};

export default FormUser;
