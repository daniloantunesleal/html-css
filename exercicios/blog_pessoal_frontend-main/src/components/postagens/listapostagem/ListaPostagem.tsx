import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListaPostagem.css';
import { useHistory } from 'react-router-dom'
import ModalPostagem from '../modalPostagem/ModalPostagem';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserState } from '../../../store/tokens/UserReducer';

function ListaPostagem() {

  const [posts, setPosts] = useState<Postagem[]>([])

  const token = useSelector<UserState, UserState['tokens']>(
    (state) => state.tokens
  )
  
  let history = useHistory();

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
      history.push("/login")

    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  console.log(posts)

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' className='container-lista-postagens'>
        <Grid xs={12}>
          <Box className='titulo-lista-postagem'>
            <Typography variant='h4' gutterBottom>
              Postagens
            </Typography>
          </Box>
          
          <Box className='caixa-modal'>
            <ModalPostagem />
          </Box>

        </Grid>

        {
          posts.map(post => (
            <Box m={12} className='caixa-cards'>
              <Card variant="outlined" className='glass-lista-postagem'>
                <CardContent>
                <Typography variant="h5" component="h3" className='usuario-postagem'>
                    {post.usuario?.nome}
                  </Typography>
                  <Typography variant="h5" component="h3" className='titulo-postagem'>
                    {post.titulo}
                  </Typography>
                  <br/>
                  <Typography variant="body2" component="p" className='texto-postagem'>
                    {post.texto}
                  </Typography>
                  <br/>
                  <Typography variant="body2" component="p"className='data-postagem'>
                    {post.data.substring(8,10) + '/' +
                     post.data.substring(5,7) + '/' +
                     post.data.substring(0,4) + ' às ' +
                     post.data.substring(11,19)}
                  </Typography>

                  <Typography variant="h6" component="p"className='tema-postagem'>
                    {post.tema?.descricao}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5}>
                    <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                      <Box mx={1}>
                        <Button variant="contained" className="btn-atualizar-postagem" size='small' color="primary" >
                          atualizar
                        </Button>
                      </Box>
                    </Link>
                    <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                      <Box mx={1}>
                        <Button className='btn-deletar-postagem'>
                          deletar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))
        }
      </Grid>
    </>
  )
}

export default ListaPostagem;