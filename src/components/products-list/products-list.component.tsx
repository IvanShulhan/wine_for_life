import { Grid } from '@mui/material';
import { ProductCardComponent } from '../product-card';

export const ProductListComponent = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 5 }, (_, i) => i).map((el) => (
        <Grid item xs={4} key={el + Math.random()}>
          <ProductCardComponent />
        </Grid>
      ))}
    </Grid>
  );
};
