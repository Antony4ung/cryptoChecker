import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container, Grid } from "@mui/material";
import {makeStyles} from '@mui/styles'
import { Context } from "../context";
import CoinChart from "../components/CoinChart";
import parse from 'html-react-parser'

const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  image:{
    width: "100px", height: "auto", margin: "50px 0" 
  }
})


export default function CoinDetail() {
  const { id } = useParams();
  const { currency, symbol } = useContext(Context);
  const [coinData, setCoinData] = useState();

  const fetchCoinData = async (id) => {
    const { data } = await axios.get(SingleCoin(id));
    setCoinData(data);
  };

  const classes = useStyles() 

  useEffect(() => {
    fetchCoinData(id);
  }, [id]);

  return (
    <Container>
      {coinData ? (
        <Grid container spacing={2}>
          <Grid
            sx={{
              height: {
                xs: "auto",
                md: "90vh",
                display: "flex",
                alignItems: "center",
              },
            }}
            item
            xs={12}
            md={4}
          >
            <Container>
              <Box
                sx={{
                  
                  mt: { sm: 5, md: "none" },
                }}
              >
                <img
                  alt={coinData.name}
                  src={coinData?.image.large}
                 className={classes.image}
                />
              </Box>

              <h1 className={classes.heading}>{coinData.name}</h1>
              <p style={{ margin: "10px 0" }}>
                {parse(coinData.description.en.split(". ")[0])}
              </p>
              <h3 style={{ margin: "8px 0" }}>
                Rank - {coinData.market_cap_rank}
              </h3>
              <h3 style={{ margin: "8px 0" }}>
                Current price - {symbol} {" "}
                {coinData.market_data.current_price[currency.toLowerCase()]}{" "}
                
              </h3>
              <h3 style={{ margin: "8px 0" }}>
                Market Caps - {" "} {symbol}
                {coinData.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)}{" "}
                
              </h3>
            </Container>
          </Grid>

          <Grid
            sx={{
              height: {
                xs: "auto",
                md: "90vh",
                display: "flex",
                alignItems: "center",
              },
            }}
            item
            xs={12}
            md={8}
          >
            <CoinChart id={id}/>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
