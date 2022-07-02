import React, { useState } from "react";
import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../../store/tokens/Action";
import { toast } from "react-toastify";
import { UserState } from "../../../store/tokens/UserReducer";

function Navbar() {

    const token = useSelector<UserState, UserState['tokens']>(
        (state) => state.tokens
    )

    const dispatch = useDispatch()

    let history = useHistory()

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado com sucesso!!!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'dark',
            progress: undefined
        })
        history.push('/login')
    }

    var navbarComponent

    if (token !== "") {
        navbarComponent =
            <AppBar position="static" className="navBar-style">
                <Toolbar variant="dense">
                    <Grid container direction="row" alignItems="center">
                        <Grid md={11}>
                            <Box className="caixa-nav">
                                <Link to='/home' className='text-decorator-none'>
                                    <Box mx={1} className="logo">
                                    </Box>
                                </Link>

                                {/* <Link to='/home' className='text-decorator-none'>
                                    <Box mx={1} >
                                        <Typography variant="h6" className="cursor-navbar">
                                            Home
                                        </Typography>
                                    </Box>
                                </Link> */}

                                <Link to='/postagens' className='text-decorator-none'>
                                    <Box mx={1}>
                                        <Typography variant="h6" className="cursor-navbar">
                                            Postagens
                                        </Typography>
                                    </Box>
                                </Link>

                                <Link to='/temas' className='text-decorator-none'>
                                    <Box mx={1}>
                                        <Typography variant="h6" className="cursor-navbar">
                                            Temas
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid md={1}>
                            <Box justifyContent="left" alignItems='center'>
                                <Box mx={1} onClick={goLogout}>
                                    <Typography variant="h6" className="cursor-navbar" >
                                        Logout
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;