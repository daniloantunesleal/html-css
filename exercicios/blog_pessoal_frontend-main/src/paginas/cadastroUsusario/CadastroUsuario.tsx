import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import User from "../../models/User";
import { cadastroUsuario } from "../../services/Service";
import './CadastroUsuario.css'


function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    /*Atualiza a partir do que o usuario está digitando*/
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    /*Atualiza a partir da resposta do back-end*/
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])/*Este array dispara a função toda vez que o userResult é alterado*/


    /*Atualiza o estado do setUser a partir do que está sendo digitado*/
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    /**Atualiza o estado do confirmarSenha a partir do que foi digitado*/
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    /**Realiza o cadastro do usuário fazendo a comparação das senhas dentro do if */
    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()


        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                toast.success('Usuario cadastrado com sucesso',{
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
                toast.error('Usuario já existente',{
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
            
        } else {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.',{
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
        <Grid container direction="row" justifyContent="center" className='imagem-cad'>
            <Grid xs={4} >
                <Box className='center-grid-cad' >
                    <Box className="form-cadastro">
                    <form onSubmit={cadastrar}>
                        <Typography variant='h3'
                            gutterBottom
                            color="textPrimary"
                            component='h3' align='center'
                            className="titulo-cadastro">
                            Cadastrar
                        </Typography>

                        <TextField
                            value={user.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='nome'
                            label='nome'
                            variant='filled'
                            name='nome'
                            margin="normal"
                            className="textfields-cadastro"
                            required
                            fullWidth>
                        </TextField>

                        <TextField
                            value={user.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='usuario'
                            label='usuário'
                            variant='filled'
                            name='usuario'
                            margin='normal'
                            type='email'
                            className="textfields-cadastro"
                            required
                            fullWidth>
                        </TextField>

                        <TextField
                            value={user.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='foto'
                            label='foto'
                            variant='filled'
                            name='foto'
                            margin="normal"
                            className="textfields-cadastro"
                            fullWidth>
                        </TextField>

                        <TextField
                            value={user.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha'
                            label='senha'
                            variant='filled'
                            name='senha'
                            margin="normal"
                            type='password'
                            className="textfields-cadastro"
                            required
                            fullWidth>
                        </TextField>

                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id='confirmarSenha'
                            label='Confirmar Senha'
                            variant='filled'
                            name='confirmarSenha'
                            margin='normal'
                            type='password'
                            className="textfields-cadastro"
                            required
                            fullWidth>
                        </TextField>

                        <Box>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btn-cancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' className='btn-cadastrar'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                    </Box>        
                </Box>
            </Grid>

        </Grid>
    );

}

export default CadastroUsuario;