import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container'
import crypto from '../img/cryptocurrencies.png'
import { IconButton } from '@mui/material';
import {Context} from '../context'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useTheme} from '@mui/material/styles'

export default function ButtonAppBar() {

  const {colorMode} = React.useContext(Context)

  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Container>
        <Toolbar>
        <Box sx={{ flexGrow: 1,py:1 }}>
          <img alt="logo" src={crypto} style={{width:"50px",height:"auto"}}  />
        </Box>
          
          
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ?  <Brightness4Icon /> : <Brightness7Icon />} 
      </IconButton>
            
          
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
