import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/material/Menu";
const Menu = () => {
    return (
        <>
            <Box
                sx={{
                    m: 0.5,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "flex-end",
                    bgcolor: "primary.main",
                    color: "primary.main",
                }}
            >
                <Typography component={"span"}>
                    <MenuIcon />
                </Typography>

                <Typography component={"span"}>
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </Typography>
            </Box>
        </>
    );
};

export default Menu;
