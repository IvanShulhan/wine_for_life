import { Container, Typography } from '@mui/material';
import { HeaderComponent } from '../../components/header';
import { ProductListComponent } from '../../components/products-list';

export const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <HeaderComponent />
      <Typography variant="h4">Home Page</Typography>
      <ProductListComponent />
    </Container>
  )
}