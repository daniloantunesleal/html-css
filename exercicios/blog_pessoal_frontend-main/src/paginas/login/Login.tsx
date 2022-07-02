import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import './Login.css';
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/Action";
import { toast } from "react-toastify";


function Login() {

    let history = useHistory()
    const dispatch = useDispatch()

    const [token, setToken] = useState('')
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [respUserLogin, setrespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''

    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token))
            history.push('/home')
        }
    }, [token])

    useEffect(() => {

        console.log("Token: " + respUserLogin.token)
        console.log("ID: " + respUserLogin.id)
        if (respUserLogin.token !== '') {
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            history.push('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await login(`usuarios/logar`, userLogin, setrespUserLogin)
            toast.success('Usuário logado com sucesso!!!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined
            })


        } catch (error) {
            toast.error('Os dados do usuário estão inconsistentes. Erro ao logar.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined
            })
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' className="imagem">

            <Grid xs={4} >
                <Box className='center-grid'>
                    <Box className='form-login'>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3'
                                gutterBottom
                                color="textPrimary"
                                component='h3' align='center'
                                className="titulo-login">
                                Entrar
                            </Typography>
                            <TextField
                                value={userLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='usuario'
                                label='usuário'
                                variant='filled'
                                name='usuario'
                                margin="normal"
                                className="textfields-login"
                                fullWidth>
                            </TextField>
                            <TextField
                                value={userLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='senha'
                                label='senha'
                                variant='filled'
                                name='senha'
                                margin='normal'
                                type='password'
                                className="textfields-login"
                                fullWidth>
                            </TextField>
                            <Box>
                                <Button type='submit' variant='contained' className="btn-logar">
                                    Logar
                                </Button>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    align='center'
                                    className='pergunta'>
                                    Não tem uma conta?
                                </Typography>
                            </Box>
                            <Link to='/cadastrousuario'>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    align='center'
                                    className="textos">
                                    Cadastre-se
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    )
}

export default Login