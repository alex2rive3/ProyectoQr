import React from "react";
import {
    Container,
    Card,
    CardContent,
    makeStyles,
    Grid,
} from "@material-ui/core";
import Scaner from "./components/Scaner";
import GeneradorQR from "./components/GeneradorQR";

function App() {
    const classes = useStyles();

    return (
        <Container className={classes.conatiner}>
            <Card>
                <h2 className={classes.title}>Generador de Codigos QR</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <GeneradorQR />
                            <br />
                            <br />
                            <br />
                        </Grid>

                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Scaner />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
        marginTop: 10,
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#3f51b5",
        color: "#fff",
        padding: 20,
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
    },
}));
export default App;
