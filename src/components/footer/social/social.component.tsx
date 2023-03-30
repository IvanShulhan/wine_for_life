import { Box } from '@mui/material';
import { TitleComponent } from '../../title.component';
import * as Styled from './social.styled';
import { ReactComponent as Instagram } from '../../../assets/icons/instagram.svg';
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg';
import { ReactComponent as Facebook } from '../../../assets/icons/facebook.svg';
import { TitleColors } from '../../../common/types/colors.enums';

export const SocialComponent = () => (
  <Box>
    <Box sx={{ marginBottom: 3 }}>
      <TitleComponent title="Keep in touch" color={TitleColors.white} />
    </Box>
    <Styled.Wrapper>
      <Styled.SocialLink href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <Instagram />
      </Styled.SocialLink>
      <Styled.SocialLink href="https://www.twitter.com/" target="_blank" rel="noreferrer">
        <Twitter />
      </Styled.SocialLink>
      <Styled.SocialLink href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <Facebook />
      </Styled.SocialLink>
    </Styled.Wrapper>
  </Box>
);
