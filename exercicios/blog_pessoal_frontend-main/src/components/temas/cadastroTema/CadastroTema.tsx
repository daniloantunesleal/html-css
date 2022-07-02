import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import Tema from "../../../models/Tema";
import { buscaId, post, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserState } from "../../../store/tokens/UserReducer";
import './CadastroTema.css'

function CadastroTema() {

    let history = useHistory();
    const { id } = useParams<{ id: string }>()
    const token = useSelector<UserState, UserState['tokens']>(
        (state) => state.tokens
    )
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
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
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
            postagem: [{}]
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                console.log(tema)
                await put(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                console.log("Retorno" + tema)
                toast.success('Tema atualizado com sucesso!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                    progress: undefined
                })
                back()
            } catch (error) {
                console.log(error)
                toast.error('Erro ao atualizar tema, por favor verifique os campos', {
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
            try {
                await post('/temas', tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Tema cadastrado com sucesso!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                    progress: undefined
                })
                back()
            } catch (error) {
                toast.error('Erro ao cadastrar tema, por favor verifique os campos', {
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
    }

    function back() {
        history.push('/')
        history.push('/temas')
    }

    var textoCadAtualiza

    if (id == undefined) {
        textoCadAtualiza =
            <Typography
                variant="h3"
                color="textSecondary"
                component="h1"
                align="center"
                className='titulo-cad-tema' >
                Cadastro de Tema
            </Typography>

    } else {
        textoCadAtualiza =
            <Typography
                variant="h3"
                color="textSecondary"
                component="h1"
                align="center"
                className='titulo-cad-tema' >
                Atualização de Tema
            </Typography>
    }


    return (
        <Container maxWidth='sm' className="tema-container">
            <form onSubmit={onSubmit} >
                <Box>
                    {textoCadAtualiza}
                </Box>
                <Box className="form-box">
                    <TextField
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
                        id="descricao"
                        label="descrição"
                        name="descricao"
                        margin="normal"
                        className="textfiels-cad-tema"
                        fullWidth />
                    
                <Button
                    type="submit"
                    className='btn-finalizar'>
                    Finalizar
                </Button>
                </Box>
            </form>
        </Container>
    )
}

export default CadastroTema;