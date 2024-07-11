// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const OrdersTable = ({ orders }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>User Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Address</TableCell>
//             <TableCell>Order ID</TableCell>
//             <TableCell>Items</TableCell>
//             <TableCell>Total</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {orders.map(order => (
//             <TableRow key={order._id}>
//               <TableCell>{order.uname}</TableCell>
//               <TableCell>{order.email}</TableCell>
//               <TableCell>{order.address}</TableCell>
//               <TableCell>{order.orders.map(o => o._id).join(', ')}</TableCell>
//               <TableCell>
//                 <ul>
//                   {order.orders.map(o => (
//                     o.items.map(item => (
//                       <li key={item._id}>
//                         {item.name} - Quantity: {item.quantity} - Price: ${item.price}
//                       </li>
//                     ))
//                   ))}
//                 </ul>
//               </TableCell>
//               <TableCell>${order.orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default OrdersTable;
import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material'; 

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  
    const userId = localStorage.getItem('userId');

    const fetchOrderHistory = async () => {
      try {
       
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

    if (userId) {
      fetchOrderHistory();
    }
  }, []); 

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>
      <List>
        {orders.map((order) => (
          <div key={order._id}>
            <ListItem>
              <ListItemText
                primary={`Order #${order._id}`}
                secondary={`Total: $${order.orders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}`} // Calculate total of all orders
              />
            </ListItem>
            <List>
              {order.orders.map((subOrder) => (
                <div key={subOrder._id}>
                  <ListItem>
                    <ListItemText
                      primary={`${subOrder.items.length} item${subOrder.items.length > 1 ? 's' : ''}`}
                      secondary={`Total: $${subOrder.total.toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default OrderHistory;


