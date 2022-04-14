import React, { useContext } from "react";
import {Route, Routes} from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Context } from "./context";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";
import Header from './components/Header'




export default function App() {


  const { mode } = useContext(Context);

  const theme = createTheme({
    palette: {
      mode
    },
  });



  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight:"100vh"
        }}
      ><Header  />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<CoinDetail/>}/>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
