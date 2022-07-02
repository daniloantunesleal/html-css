import { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './DeletarTema.css';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserState } from '../../../store/tokens/UserReducer';


function DeletarTema() {

  let history = useHistory();
  const { id } = useParams<{ id: string }>()
  const token = useSelector<UserState, UserState['tokens']>(
    (state) => state.tokens
  )
  const [tema, setTema] = useState<Tema>()

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

  async function sim() {
    try {
      history.push('/temas')
      await deleteId(`/temas/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      toast.success('Tema deletado com sucesso', {
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
      toast.error('Erro ao deletar tema', {
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
    history.push('/temas')
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' className='container-deleta-postagens'>
        <Grid xs={12}>
          <Box>
            <Typography className='titulo-deleta-tema' variant='h4' gutterBottom>
              Deletar Tema
            </Typography>
            <Typography className='titulo-deleta-tema' variant='h5' gutterBottom>
              Tem certeza que deseja deletar este tema?
            </Typography>
          </Box>
        </Grid>
        <Box m={12} className='caixa-cards'>
          <Card variant="outlined" className='glass-deleta-tema'>
            <CardContent>
              <Box justifyContent="center">
                <Typography className='titulo-tema' gutterBottom>
                  {tema?.descricao}
                </Typography>
              </Box>
            </CardContent>

            <CardActions >
              <Box display="flex" justifyContent="center" width='100%'>
                <Box  mx={2}>
                  <Button
                    onClick={sim}
                    className="btn-sim-deletar-tema">
                    Sim
                  </Button>
                </Box>

                <Box mx={2}>
                  <Button
                    onClick={nao}
                    className='btn-nao-deletar-tema'>
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
export default DeletarTema;