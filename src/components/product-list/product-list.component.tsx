import { Box, Grid } from '@mui/material';
import { useAppSelector } from '../../store/app/hooks';
import { selectProducts } from '../../store/products/productsSlice';
import { SelectComponent } from './select';

const sortValues = ['low to high', 'high to low'];

export const ProductListComponent = () => {
  const products = useAppSelector(selectProducts);

  return (
    <Grid container spacing="20px">
      <Grid item xs={6}>
        <SelectComponent name="sort by popularity" values={sortValues} />
      </Grid>
      <Grid item xs={6}>
        <SelectComponent name="sort by price" values={sortValues} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing="20px">
          <Grid item xs={6}>
            <Box sx={{ bgcolor: 'green', height: 40 }} />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ bgcolor: 'green', height: 40 }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
