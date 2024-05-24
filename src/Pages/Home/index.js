import React from 'react';
import { Slider, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import spicy from "../../assets/Images/spicy.jpg"
import mccrispy from "../../assets/Images/mccrispy.jpg"
import cheese from "../../assets/Images/cheese.jpg"

// Styled component for the card
const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

// Array of slider items
const sliderItems = [
  {
    title: 'Big Mac',
    image: spicy,
    description: 'The one and only Big Mac burger.',
  },
  {
    title: 'Chicken Nuggets',
    image: mccrispy,
    description: 'Delicious crispy chicken nuggets.',
  },
  {
    title: 'French Fries',
    image: cheese,
    description: 'Golden and crispy french fries.',
  },
];

const SliderTemplate = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={sliderItems.length - 1}
        step={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        {sliderItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CustomCard>
              <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SliderTemplate;
