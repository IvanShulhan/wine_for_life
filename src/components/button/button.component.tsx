import { buttonColors } from '../../common/types/button-colors.enum';
import { CustomButton } from './button.styled';

interface IProps {
  text: string;
  bgColor?: buttonColors;
  textColor?: buttonColors;
} 

export const ButtonComponent: React.FC<IProps> = ({ 
  text, 
  bgColor = buttonColors.red,
  textColor = buttonColors.white,  
}) => (
  <CustomButton 
    textColor={textColor} 
    bgColor={bgColor}
    type="submit"
  >
    {text}
  </CustomButton>
)