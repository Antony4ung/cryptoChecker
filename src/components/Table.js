import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Container from "@mui/material/Container";
import { CoinList } from "../config";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { TableContainer, Paper, Box, Pagination } from "@mui/material";

import TextField from "@mui/material/TextField";
export default function TableCom() {
  const { currency, symbol } = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [coinList, setCoinList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filterCoinList = () => {
    return coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery) ||
        coin.symbol.toLowerCase().includes(searchQuery)
    );
  };

  const navigate = useNavigate();

  const [page, setPage] = React.useState("1");

  const fetchCoinList = async (currency,page) => {
    const { data } = await axios.get(CoinList(currency, page));
    setCoinList(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCoinList(currency,page);
  }, [currency, page]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          mt: 5,
          mb: 2,
          width: "60%",
          minWidth: "320px",
        }}
      >
        <TextField
          id="outlined-basic"
          sx={{ width: "100%" }}
          label="Search Crypto"
          variant="outlined"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
      </Box>
      <Container>
      <TableContainer sx={{ mb: 5, mt: 3 }} component={Paper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e84142" }}>
                <TableCell>Coin</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">24h Change</TableCell>
                <TableCell align="center">Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterCoinList().map((item, index) => {
                const profit = item.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => navigate(`${item.id}`)}
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#64728b",
                      },
                    }}
                  >
                    <TableCell component="td" scope="row">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.image}
                          alt={item.id}
                          style={{ width: "40px", marginRight: "10px" }}
                        />
                        <p>{item.id}</p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {item.current_price}
                      {symbol}
                    </TableCell>
                    <TableCell
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                      }}
                      align="center"
                    >
                      {item.price_change_percentage_24h}
                    </TableCell>
                    <TableCell align="center">
                      {item.market_cap.toString().slice(0, -6)}
                      {symbol}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      </Container>

      <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
        <Pagination
          count={1287}
          value="1"
          onChange={(_, value) => setPage(value.toString())}
        />
      </Box>
    </Box>
  );
}
