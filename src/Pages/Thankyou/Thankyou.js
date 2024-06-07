import React from 'react';
import { Button, Container, Typography, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ThankYouPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Thank You for Placing Your Order!
      </Typography>
      <Typography variant="body1">
        Your order has been successfully placed. We will send you an email confirmation shortly.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button}
        href="/"
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default ThankYouPage;
