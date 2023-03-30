import { Box } from '@mui/material';
import { TitleColors } from '../../../common/types/colors.enums';
import { TitleComponent } from '../../title.component';
import * as Styled from './contacts.styled';

export const ContactsComponent = () => (
  <Box>
    <Box sx={{ marginBottom: 3 }}>
      <TitleComponent title="Contact and service" color={TitleColors.white} />
    </Box>

    <Styled.Wrapper>
      <Styled.CustomLink
        href="https://goo.gl/maps/YbPvVGZawVdLAu4XA"
        target="_blank"
        rel="noreferrer"
        underline="hover">
        <Styled.Wrapper>
          <Styled.Text>21 Shevchenko Str.</Styled.Text>
          <Styled.Text>Kyiv</Styled.Text>
          <Styled.Text>Ukraine</Styled.Text>
        </Styled.Wrapper>
      </Styled.CustomLink>
      <Styled.CustomLink href="tel:+380310000000" underline="hover">
        <Styled.Text>+ 380 (31) 000 00 00</Styled.Text>
      </Styled.CustomLink>
      <Styled.CustomLink href="mailto:winehouse@mail.ua" underline="hover">
        <Styled.Text>winehouse@mail.ua</Styled.Text>
      </Styled.CustomLink>
    </Styled.Wrapper>
  </Box>
);
