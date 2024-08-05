import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        const fetchedOrders = response.data;

        // Flatten the orders into a single array and sort them by date
        const allOrders = fetchedOrders.flatMap(user => 
          user.orders.map(order => ({
            ...order,
            userId: user._id,
            uname: user.uname,
            email: user.email,
            address: user.address
          }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(allOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
        Orders List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow
                key={order._id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, // Alternating row colors
                  '&:hover': { backgroundColor: '#e0f7fa' }, // Highlight row on hover
                }}
              >
                <TableCell>
                  <Select
                    value={order.status || 'preparing'} // default to 'preparing' if no status
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    fullWidth
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="preparing">Preparing</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ color: '#555' }}>{order.uname}</TableCell>
                <TableCell sx={{ color: '#555' }}>{order.email}</TableCell>
                <TableCell sx={{ color: '#00796b' }}>${order.total.toFixed(2)}</TableCell> {/* Green color for amount */}
                <TableCell sx={{ color: '#555' }}>{order.address}</TableCell>
                <TableCell sx={{ color: '#555' }}>{new Date(order.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminOrdersTable;
