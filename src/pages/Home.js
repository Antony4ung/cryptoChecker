import React, { useContext, useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios'
import { TrendingCoins } from '../config';
import CaroselDiv from '../components/CaroselDiv';
import Table from '../components/Table';
import { Context } from '../context';
import CircularProgress from '@mui/material/CircularProgress';
import bg from '../img/crypto-bg.png'

export default function Home() {

  

    const {currency,setCurrency} = useContext(Context)
    
    const [trendingData,setTrendingData] = useState([])

    const [loading,setLoading] = useState(true)
    

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const fetchData = async (currency) =>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrendingData(data)
    setLoading(false)
  }

  useEffect(()=>{
    fetchData(currency)
    
  },[currency])

  return (
    <div>
        <Box sx={{display:"flex",justifyContent:"end",mr:5,my:5}}>
        <FormControl  sx={{width:"120px"}}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                >
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'MMK'}>MMK</MenuItem>
                    <MenuItem value={'SGD'}>SGD</MenuItem>
                    <MenuItem value={'THB'}>THB</MenuItem>
                    
                </Select>
            </FormControl>
        </Box>

        <Box sx={{my:5}}>
            <h1 style={{textAlign:"center",marginBottom:"20px",fontFamily: ['Poiret One','cursive'],fontSize:"35px"}}>
            Crypto Checker
            </h1>
            <p style={{textAlign:"center",color:"#ffff",fontFamily: ['Poiret One','cursive']}}>
                Get All The Info Regarding Your Favorite Crypto Currency
            </p>
        </Box>

        <Box sx={{height:"40vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundImage:`url(${bg})`, backgroundSize: "cover",}}>
            { loading ? <CircularProgress /> :
              <CaroselDiv coinData={trendingData}/>
            }
        </Box>

        <Box sx={{mt:5}}>
            <h2 style={{textAlign:"center",fontFamily: ['Poiret One','cursive'],fontSize:"25px"}}>
                Cryptocurrency Prices by Market Cap
                <Table currency={currency}/>

            </h2>
        </Box>
    </div>
  )
}
