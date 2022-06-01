
import { CSSProperties, useEffect } from "react";
import { useUser } from "../context/LoginContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OneUserOrder from './OneOrder';

function UserOrderPage() {

  const { getUserOrders, orders } = useUser();

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell>Ordernr</TableCell>
          <TableCell>Total price</TableCell>
          <TableCell align="right">Order date</TableCell>
          <TableCell align="right">Shipped</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order: any) => (
          <OneUserOrder key={order.order} order={order} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default UserOrderPage;

const adminOrderPage: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: 'center',
  width:'80%'
};