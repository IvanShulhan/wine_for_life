import { ButtoTypes } from '../../common/types/button-types.enum';
import { ButtonColors } from '../../common/types/colors.enums';
import { CustomButton } from './button.styled';

interface IProps {
  text: string;
  type?: ButtoTypes;
  bgColor?: ButtonColors;
  textColor?: ButtonColors;
  onClick?: () => void;
}

export const ButtonComponent: React.FC<IProps> = ({
  text,
  type = ButtoTypes.button,
  bgColor = ButtonColors.red,
  textColor = ButtonColors.white,
  onClick
}) => (
  <CustomButton textColor={textColor} bgColor={bgColor} type={type} onClick={onClick}>
    {text}
  </CustomButton>
);
