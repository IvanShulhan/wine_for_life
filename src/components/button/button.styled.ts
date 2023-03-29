import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IButtonProps {
  textColor: string;
  bgColor: string;
}

export const CustomButton = styled(Button)<IButtonProps>(
  ({ theme, textColor, bgColor }) => ({
    borderRadius: 0,
    maxWidt: 378,
    width: '100%',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.2,
    color: theme.colors[textColor],
    backgroundColor: theme.colors[bgColor],
    padding: 13,
    '&:hover': {
      color: theme.colors[bgColor],
      backgroundColor: theme.colors[textColor]
    }
  })
);
