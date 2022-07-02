import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography, Grid, Box } from '@material-ui/core';

import './ListaTema.css';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserState } from '../../../store/tokens/UserReducer';
import ModalTema from '../modalTema/ModalTema';

function ListaTema() {

  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<UserState, UserState['tokens']>(
    (state) => state.tokens
  )

  const [atualPage, setAtualPage] = useState(window.location.href.toString())
  
  let history = useHistory();


  useEffect(() => {
    if (token == '') {
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

  async function getTema() {
    busca('/temas', setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
    <Grid container direction='row' justifyContent='center' alignItems='center' className='container-lista-temas'>
      <Grid xs={12}>
        <Box className='titulo-lista-tema'>
          <Typography variant='h4' gutterBottom>
            Temas
          </Typography>
        </Box>

        <Box className='caixa-modal'>
          <ModalTema />
        </Box>

      </Grid>

      {
        temas.map(tema => (
          <Box m={12} className='caixa-cards'>
            <Card variant="outlined" className='card-style'>
              <CardContent>
                <Typography variant="h5" component="h3" className='titulo-tema'>
                  {tema.descricao}
                </Typography>

              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button className="btn-atualizar-tema" size='small' >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button className='btn-deletar-tema'>
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


export default ListaTema;