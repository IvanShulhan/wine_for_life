import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { SearchComponent } from './search';
import {ReactComponent as Logo} from '../../assets/icons/logo.svg';
import {ReactComponent as User} from '../../assets/icons/user.svg';
import {ReactComponent as Bag} from '../../assets/icons/bag.svg';

import * as Styled from './header.styled';
import { Link } from 'react-router-dom';


export const HeaderComponent = () => {
  return (
    <Box sx={{ paddingY: 2 }}>
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Styled.CustomIcon width={78} height={60}>
            <Logo />
          </Styled.CustomIcon>
        </Grid>
        <Grid item xs={6}>
          <Styled.Navbar>
            <SearchComponent />
            <Link to="/profile">
              <Styled.CustomIcon width={32} height={32}>
                <User />
              </Styled.CustomIcon>
            </Link>
            <Link to="/bag">
              <Styled.CustomIcon width={32} height={32}>
                <Bag />
              </Styled.CustomIcon>
            </Link>
            <Styled.CustomButton>Log in</Styled.CustomButton>
          </Styled.Navbar>
        </Grid>
      </Grid>
      </Container>
    </Box>
  )
}