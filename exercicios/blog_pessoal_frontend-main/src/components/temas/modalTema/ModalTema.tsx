import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Box } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import './ModalTema.css';
import CadastroTema from '../cadastroTema/CadastroTema';


function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: '#000000',
      borderRadius: '6px',
      backgroundSize: '100%',
      border: '2px solid #00ffff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function ModalTema () {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="flex-end" className="close">
        <CloseIcon onClick={handleClose}/>
      
      </Box>
      
      <CadastroTema/>
      
    </div>
  );

  return (
    <div>
      <Button
        variant="outlined"
        className="btn-novo-tema"
        onClick={handleOpen}>Novo Tema</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ModalTema