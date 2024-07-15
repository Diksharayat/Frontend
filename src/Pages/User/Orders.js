
// import React, { useEffect, useState } from 'react';
// import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material'; 

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
  
//     const userId = localStorage.getItem('userId');

//     const fetchOrderHistory = async () => {
//       try {
       
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setOrders(data.orders); 
//       } catch (error) {
//         console.error('Error fetching order history:', error);
//       }
//     };

//     if (userId) {
//       fetchOrderHistory();
//     }
//   }, []); 

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         Order History
//       </Typography>
//       <List>
//         {orders.map((order) => (
//           <div key={order._id}>
//             <ListItem>
//               <ListItemText
//                 primary={`Order #${order._id}`}
               
//                 secondary={`Date: ${new Date(order.date).toLocaleDateString()} ${new Date(order.date).toLocaleTimeString()}`} // Display formatted date
//               />
//             </ListItem>
//             <List>
//               {order.orders.map((subOrder) => (
//                 <div key={subOrder._id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={`${subOrder.items.length} item${subOrder.items.length > 1 ? 's' : ''}`}
//                       secondary={`Total: $${subOrder.total.toFixed(2)}`}
//                     />
//                   </ListItem>
//                   <Divider />
//                 </div>
//               ))}
//             </List>
//             <Divider />
//           </div>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default OrderHistory;
import React, { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Divider, List, ListItem, ListItemText } from '@mui/material'; 

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
        setOrders(data.orders); 
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
      <Typography variant="h4" gutterBottom sx={{color:"rgb(154 3 31 / 88%)"}}>
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
              {order.orders.map((subOrder, index) => (
                <React.Fragment key={`${order._id}-${index}`}>
                  <TableRow>
                    <TableCell>{subOrder._id}</TableCell>
                    <TableCell>{new Date(subOrder.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <ul>
                        {subOrder.items.map((item, itemIndex) => (
                          <li key={`${order._id}-${index}-${itemIndex}`}>
                            {`${item.quantity} x ${item.name}`}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>${subOrder.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                 
                        variant="contained"
                        size="large"
                        type="submit"
                        style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
                        onClick={() => handleExpandOrder(`${order._id}-${index}`)}
                      >
                        {expandedOrderId === `${order._id}-${index}` ? 'Hide Details' : 'View Details'}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={expandedOrderId === `${order._id}-${index}`} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div" sx={{color:"rgb(154 3 31 / 88%)"}}>
                            Order Details
                          </Typography>
                          <List>
                            <ListItem>
                              <ListItemText
                             sx={{color:"rgb(154 3 31 / 88%)"}}
                                primary={`Items: ${subOrder.items.map(item => `${item.quantity} x ${item.name}`).join(', ')}`}
                                secondary={`Total: $${subOrder.total.toFixed(2)}`}
                              />
                            </ListItem>
                          </List>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell colSpan={5}><Divider /></TableCell> */}
                  </TableRow>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistory;
