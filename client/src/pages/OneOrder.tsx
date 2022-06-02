// import { Order } from "@server/types";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";
import { Order } from "../../../server/resources";
import { useOrders } from "../context/OrderContext";

interface Props {
  order: Order;
}

export default function OneOrder(props: Props) {
  const [open, setOpen] = useState(false);
  const { getAllOrders, markOrder } = useOrders();
  const date = new Date(props.order.createdAt);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Fragment>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          sx={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {props.order.id}
        </TableCell>
        <TableCell
          align="left"
          component="th"
          scope="row"
          sx={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {props.order.totalPrice} SEK
        </TableCell>
        <TableCell
          align="center"
          sx={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          {date.toLocaleDateString()}
        </TableCell>
        <TableCell align="center">
          {props.order.isSent ? (
            "Yes"
          ) : (
            <Button
              onClick={() => [
                markOrder({ ...props.order, isSent: true }),
                getAllOrders(),
              ]}
              variant="contained"
            >
              Send
            </Button>
          )}
        </TableCell>
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
                    <TableCell style={{ fontWeight: "bold" }}>
                      Customer
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Address
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Zipcode
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      City
                    </TableCell>
                  </TableRow>
                  {props.order.deliveryAddress.map((deliveryAddress) => (
                    <TableRow key={1}>
                      <TableCell scope="row">
                        {deliveryAddress.fullname}
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
                    <TableCell style={{ fontWeight: "bold" }}>Item</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Amount
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Price per item
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.order.products.map((product) => {
                    return (
                      <TableRow key={product.id}>
                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell align="right">{product.stock}</TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
