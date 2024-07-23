import React, { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, List, ListItem, ListItemText } from '@mui/material'; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Extract and flatten the nested orders structure
        const flattenedOrders = data.orders.flatMap(user => user.orders);

        // Sort orders by date in descending order (latest first)
        const sortedOrders = flattenedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleExpandOrder = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ color: "rgb(154 3 31 / 88%)" }}>
        Order History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell> {/* Empty cell for buttons */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <TableRow>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                <TableCell>
                  <ul>
                    {order.items.map((item, itemIndex) => (
                      <li key={`${order._id}-${itemIndex}`}>
                        {`${item.quantity} x ${item.name}`}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
                    onClick={() => handleExpandOrder(order._id)}
                  >
                    {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                  <Collapse in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div" sx={{ color: "rgb(154 3 31 / 88%)" }}>
                        Order Details
                      </Typography>
                      <List>
                        {order.items.map((item, itemIndex) => (
                          <ListItem key={`${order._id}-${itemIndex}`}>
                            <ListItemText
                              primary={
                                <>
                                  <Typography variant="body1">Item {itemIndex + 1}</Typography>
                                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                                  <Typography variant="body1">Name: {item.name}</Typography>
                                  <Typography variant="body1">Price: ${item.price.toFixed(2)}</Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <ListItemText
                            primary={`Total: $${order.total.toFixed(2)}`}
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistory;
