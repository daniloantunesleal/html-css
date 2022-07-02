import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardActions, CardContent, Grid } from "@material-ui/core"
import { buscaId, deleteId } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';
import { useHistory, useParams } from 'react-router-dom';

import Postagem from '../../../models/Postagem';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/UserReducer';

import './DeletarPostagem.css'

function DeletarPostagem() {

  let history = useHistory();
  const { id } = useParams<{ id: string }>()
  const token = useSelector<UserState, UserState['tokens']>(
    (state) => state.tokens
  )
  const [post, setPosts] = useState<Postagem>()

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
    buscaId(`/postagens/${id}`, setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function sim() {
    try {
      history.push('/postagens')
      await deleteId(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      toast.success('Postagem deletada com sucesso!', {
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
      toast.error('Erro ao deletar postagem', {
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

  function nao() {
    history.push('/postagens')
  }


  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' className='container-deleta-postagens'>
        <Grid xs={12}>
          <Box>
            <Typography className='titulo-deleta-postagem' variant='h4' gutterBottom>
              Deletar Postagem
            </Typography>
            <Typography className='titulo-deleta-postagem' variant='h5' gutterBottom>
              Tem certeza que deseja deletar esta postagem?
            </Typography>
          </Box>
        </Grid>
        <Box m={12} className='caixa-cards'>
          <Card variant="outlined" className='glass-deleta-postagem'>
            <CardContent>
              <Box justifyContent="center">
                <Typography variant="h5" component="h2" className='titulo-postagem'>
                  {post?.titulo}
                </Typography>

                <Typography variant="body2" component="p" className='texto-postagem'>
                  {post?.texto}
                </Typography>

                <Typography variant="body2" component="p" className='tema-postagem'>
                  {post?.tema?.descricao}
                </Typography>

                <Typography variant="body2" component="p" className='data-postagem'>
                  {post?.data.substring(8, 10) + '/' +
                    post?.data.substring(5, 7) + '/' +
                    post?.data.substring(0, 4) + ' às ' +
                    post?.data.substring(11, 19)}
                </Typography>
              </Box>

            </CardContent>

            <CardActions>
              <Box display="flex" justifyContent="center" width='100%'>
                <Box mx={2}>
                  <Button
                    onClick={sim}
                    variant="contained"
                    className="btn-sim-deletar-postagem"
                    size='large'
                    color="primary">
                    Sim
                  </Button>
                </Box>

                <Box>
                  <Button
                    onClick={nao}
                    variant="contained"
                    size='large'
                    className="btn-nao-deletar-postagem">
                    Não
                  </Button>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
export default DeletarPostagem;