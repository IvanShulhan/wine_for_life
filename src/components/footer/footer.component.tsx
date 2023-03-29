import { Grid, Container, Box } from '@mui/material';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialComponent } from './social/social.component';
import { styled } from '@mui/material/styles';
import { CallbackFormComponent } from './callback-form';

export const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: 24,
  paddingBottom: 40,
  backgroundColor: theme.colors['text-gray']
}));

export const FooterComponent = () => {
  return (
    <Wrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <ContactsComponent />
          </Grid>
          <Grid item xs={4}>
            <SocialComponent />
          </Grid>
          <Grid item xs={4}>
            <CallbackFormComponent />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};
