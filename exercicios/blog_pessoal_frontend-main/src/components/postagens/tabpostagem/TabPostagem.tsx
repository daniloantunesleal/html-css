import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('2')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value} >
        <AppBar position="static" className='app-bar'>
          <Tabs centered onChange={handleChange} >
            <Tab className='tabs' label="Todas as postagens" value="1"/>
            <Tab className='tabs' label="Sobre nós" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className='postagens-panel'>
          <Box justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
     
        <TabPanel value="2" className='background-sobre-nos'>
          <Box className='glass'>
          <Typography
            gutterBottom 
            variant='h5'
            className='titulo-sobre'>
              Blog Matheus Oliveira Dev
            </Typography>

            <Typography  
            gutterBottom
            className='texto-sobre'>
               Um espaço para o compartilhamento de ideias, onde o conhecimento pode
               ser acessado e dividido por todes!
               Este projeto foi criado inicialmente como parte do terceiro módulo do curso
               de formação de Pessoa Desenvolvedora Java Full Stack da Generation Brasil.
               Seu back-end foi construído utilizando o SpringBoot Framework em conjunto com
               o banco de dados MySql, que foi posteriormente substituído pelo PostGre para 
               que fossem atendidas as demandas da plataforma Heroku. O front-ende foi programado
               utilizando React, com base em Typescript e estilização em CSS. Também foram de grande
               importância as bibliotecas Material UI (MUI) e Redux para manuseio de elementos visuais
               e dados.
            </Typography>
          </Box>
           
          
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;