import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useOrders } from "../context/OrderContext";
import OneOrder from './OneOrder';

export default function OrderTable() {
  const { getAllOrders, orders } = useOrders();

  useEffect(() => {
    getAllOrders();
  }, []);

  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Ordernr</TableCell>
            <TableCell align="right">Order date</TableCell>
            <TableCell align="right">Shipped</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OneOrder key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
