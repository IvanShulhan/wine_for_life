import { Icon, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IIconProps {
  width: number;
  height: number;
}

export const Navbar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 35,
})

export const CustomIcon = styled(Icon)<IIconProps>(({width, height}) => ({
  width: width,
  height: height,
  '& svg': {
    width: '100%',
    height: '100%',
  }
}))

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 'none',
  '&:hover': {
    backgroundColor: theme.colors.white,
  }
}))

export const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 0,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.4,
  color: theme.colors['text-gray'],
  '&:hover': {
    backgroundColor: theme.colors.white,
  }
}))