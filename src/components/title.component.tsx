import { styled } from '@mui/material/styles';
import { TitleColors } from '../common/types/colors.enums';
import theme from '../theme';

interface ITitle {
  size: number;
  weight: number;
  color: string;
}

export const Title = styled('h3')<ITitle>(({ size, weight, color }) => ({
  fontFamily: 'Cormorant, serif',
  fontWeight: weight,
  fontSize: size,
  lineHeight: 1.2,
  margin: 0,
  color: theme.colors[color]
}));

type Props = {
  title: string;
  size?: number;
  weight?: number;
  color?: TitleColors;
};

export const TitleComponent: React.FC<Props> = ({
  title,
  size = 32,
  weight = 400,
  color = TitleColors.black
}) => (
  <Title size={size} weight={weight} color={color}>
    {title}
  </Title>
);
