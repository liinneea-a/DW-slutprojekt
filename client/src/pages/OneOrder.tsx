import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Order } from "@server/types";
import { Fragment, useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext";

interface Props {
  order: Order;
}

export default function OneOrder(props: Props) {
  const [open, setOpen] = useState(false);

  const { getAllOrders } = useOrders();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            cursor: "pointer",
            tooltip: "click to expand",
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {props.order.id}
        </TableCell>
        <TableCell align="right">{props.order.createdAt}</TableCell>
        <TableCell align="right">{props.order.isSent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orderdetails
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell align="right">Zipcode</TableCell>
                    <TableCell align="right">City</TableCell>
                  </TableRow>
                  {props.order.deliveryAddress.map((deliveryAddress) => (
                    <TableRow>
                      <TableCell scope="row">
                        {deliveryAddress.fullName}
                      </TableCell>
                      <TableCell>{deliveryAddress.street}</TableCell>
                      <TableCell align="right">
                        {deliveryAddress.zipcode}
                      </TableCell>
                      <TableCell align="right">
                        {deliveryAddress.city}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {props.order.products.map(product => {
                       return (
                        <TableRow key={product.name}>
                          <TableCell component="th" scope="row">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell align="right">{product.stock}</TableCell>
                          <TableCell align="right">{product.price}</TableCell>
                        </TableRow>
                      )
                    }
              
                     
                  

                    )}
                  {/* {order..map((productRow) => (
                    <TableRow key={productRow.products}>
                      <TableCell component="th" scope="row">
                        {productRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}