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
  Box,
  TextField
} from '@mui/material';
import axios from 'axios';

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        const fetchedOrders = response.data;

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
        setFilteredOrders(allOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchesEmail = emailFilter ? order.email.toLowerCase().includes(emailFilter.toLowerCase()) : true;
      const matchesDate = dateFilter ? new Date(order.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;
      return matchesEmail && matchesDate;
    });
    setFilteredOrders(filtered);
  }, [emailFilter, dateFilter, orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "rgb(154 3 31 / 88%)" }}>
      Orders List
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Filter by Email"
          variant="outlined"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          fullWidth
        />
        <TextField
          type="date"
          label="Filter by Date"
          variant="outlined"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
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
            {filteredOrders.map(order => (
              <TableRow
                key={order._id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#ef78784f' },
                }}
              >
                <TableCell>
                  <Select
                    value={order.status || 'preparing'}
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
                <TableCell sx={{ color: 'rgb(154 3 31 / 88%)' }}>${order.total.toFixed(2)}</TableCell>
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
 