import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Line } from "react-chartjs-2";
import { chartDays, HistoricalChart } from "../config";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function CoinChart({ id }) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(Context);
  const [flag,setflag] = useState(false);

  const fetchHistoricData = async (id, days, currency) => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  const handleChange = (event) => {
    setDays(event.target.value);
    setflag(false);
  };

  useEffect(() => {
    fetchHistoricData(id, days, currency);
  }, [id, days, currency]);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
 

  return (
    <Box sx={{ width: "100%",height:"100%" }}>
      {!historicData | flag===false  ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}>
          <CircularProgress style={{ color: "gold" }} size={100} thickness={1} />
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100%"}}>
        <div
            style={{
              display: "flex",
              padding :" 20px 10px",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <FormControl sx={{ width: "120px" }}>
              <InputLabel id="demo-simple-select-label">Days</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={days}
                label="Days"
                onChange={handleChange}
              >
                {chartDays.map((day, index) => (
                  <MenuItem key={index} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={options}
            />
          
        </div>
      )}
    </Box>
  );
}

// import React from 'react';

// import { Line } from 'react-chartjs-2';
// import faker from 'faker';




// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }
