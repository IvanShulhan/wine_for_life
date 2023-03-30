import { Box, Container } from '@mui/material';
import { FooterComponent } from '../../components/footer';
import { HeaderComponent } from '../../components/header';
import { TitleComponent } from '../../components/title.component';
import * as Styled from './catalog.styled';
import { SidebarComponent } from '../../components/sidebar';

export const CatalogPage = () => {
  return (
    <Styled.Page>
      <HeaderComponent />
      <Styled.Inner>
        <Container>
          <Styled.Wrapper>
            <Box sx={{ marginBottom: '21px' }}>
              <TitleComponent title="Catalog" size={48} weight={600} />
            </Box>
            <Styled.Content>
              <Styled.Item>
                <SidebarComponent />
              </Styled.Item>
              <Styled.Item>
                <>List</>
              </Styled.Item>
            </Styled.Content>
          </Styled.Wrapper>
        </Container>
      </Styled.Inner>
      <FooterComponent />
    </Styled.Page>
  );
};
