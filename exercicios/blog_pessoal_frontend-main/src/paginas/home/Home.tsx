import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';

import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserState } from '../../store/tokens/UserReducer';
import { addToken } from "../../store/tokens/Action";
import ModalTema from '../../components/temas/modalTema/ModalTema';
import setAtualPage from "../../components/estaticos/navbar/Navbar"

function Home() {

    let history = useHistory();

    /** token = store.tokens */
    const token = useSelector<UserState, UserState['tokens']>(
        (state) => state.tokens
    )

    const dispatch = useDispatch()

    const [exibeDireita, setExibeDireita] = useState()
    const [exibeEsquerda, setExibeEsquerda] = useState()
    const [cont, setCont] = useState(0)
    const [animaIcon, setAnimaIcon] = useState('icone-interact')

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

    var atualPage = window.location.href.toString()
    function exibirBotoes() {
        console.log('url: ' + atualPage)
        setCont(cont + 1)
        if (cont % 2 === 0) {
            setAnimaIcon('icone-interact2')
            setExibeDireita(botoesDireita)
            setExibeEsquerda(botoesEsquerda)

        } else {
            setAnimaIcon('icone-interact')
            setExibeDireita(undefined)
            setExibeEsquerda(undefined)
        }
    }
    var botoesDireita: any
    botoesDireita =
        <Box className='btns-direita'>
            <Box>
                <ModalPostagem />
            </Box>
            <Box display="flex" justifyContent="left">
                <Box>
                    <ModalTema />
                </Box>
            </Box>
        </Box>


    var botoesEsquerda: any
    botoesEsquerda =
        <Box>
            <Box display="flex" justifyContent="right">
                <Link to='/postagens' className='text-decorator-none'>
                    <Button variant="outlined" className='btn-ver-postagens btns-left'>
                        Ver Postagens
                    </Button>
                </Link>
            </Box>
            <Box display="flex" justifyContent="right">
                <Link to='/temas' className='text-decorator-none'>
                    <Button variant="outlined" className='btn-ver-temas btns-left'>
                        Ver Temas
                    </Button>
                </Link>
            </Box>
            <Box display="flex" justifyContent="right">
                <Button variant="outlined" className='btn-logout btns-left'  onClick={goLogout}>
                    Logout
                </Button>
            </Box>
        </Box>



    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={12}>
                    <Box paddingX={20} >
                        <Typography variant="h3"
                            gutterBottom color="textPrimary"
                            component="h3" align="center"
                            className='titulo'>
                            Seja bem vinde!
                        </Typography>

                        <Typography variant="h5"
                            gutterBottom
                            component="h5"
                            align="center"
                            className='titulo'>
                            Um espaço seguro para compartilhar conhecimento e novas ideias!
                        </Typography>

                        <Typography variant="h5"
                            gutterBottom
                            component="h5"
                            align="center"
                            className='titulo'>
                            Clique no ícone abaixo para expandir sua mente!
                        </Typography>
                    </Box>
                </Grid>

                <Grid xs={5}>
                    {exibeEsquerda}
                </Grid>

                <Grid item xs={2} alignItems='center' justifyContent='center'>

                    <Box onClick={exibirBotoes} className={animaIcon}>

                    </Box>

                </Grid>

                <Grid xs={5}>
                    {exibeDireita}
                </Grid>


                <Grid xs={12} className='postagens'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;