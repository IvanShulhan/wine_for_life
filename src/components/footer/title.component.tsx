import { styled } from '@mui/material/styles';

export const Title = styled('h3')(({ theme }) => ({
  fontFamily: 'Cormorant, serif',
  fontWeight: 400,
  fontSize: 32,
  lineHeight: 1.2,
  marginTop: 0,
  marginBottom: 24,
  color: theme.colors.white,
}));

type Props = {
  title: string;
}

export const TitleComponent: React.FC<Props> = ({ title }) => (
  <Title>{title}</Title>
)