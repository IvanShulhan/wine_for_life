import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IButtonProps {
  textcolor: string;
  bgcolor: string;
}

export const CustomButton = styled(Button)<IButtonProps>(({ theme, textcolor, bgcolor }) => ({
  borderRadius: 0,
  maxWidt: 378,
  width: '100%',
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors[textcolor],
  backgroundColor: theme.colors[bgcolor],
  padding: 13,
  '&:hover': {
    color: theme.colors[bgcolor],
    backgroundColor: theme.colors[textcolor]
  }
}));
