import { Box,Container } from "@mui/material";
import React, { useContext } from "react";
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from "react-router-dom";
import { Context } from "../context";
export default function CaroselDiv({ coinData }) {

const navigate = useNavigate()

const {symbol} = useContext(Context)
    
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    }
  };

  const items = coinData.map((coin) =>{ 
      let profit = coin?.price_change_percentage_24h >= 0;
    return(
        <Box onClick={()=>navigate(`/${coin.id}`)} sx={{display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer"}}>
      <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 20 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
            {coin?.current_price.toFixed(2)} <span style={{ fontSize: 20, fontWeight: 500 }}>{symbol}</span>
        </span>
    </Box>
    )
    }
  );

  return <Container>
      <AliceCarousel
           mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
  </Container>;
}
