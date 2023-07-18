import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from "next/image";
import {
    Box,
    AppBar,
    Toolbar,
    MenuItem,
    IconButton,
    Menu
} from "@mui/material";

const Header = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Image
                        src="https://ci3.googleusercontent.com/mail-sig/AIorK4zsebgLgug36aJgFky2g681g3zXMz0y7-V-hITnTywQfexfRYrrsKUxQr0S2jmV-KZOFsCnvws"
                        alt="Logo"
                        width={150}
                        height={30}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;