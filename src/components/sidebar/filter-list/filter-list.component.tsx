import { FormControlLabel, Checkbox } from '@mui/material';
import { v4 as uuid } from 'uuid';
import helperFuncs from '../../../common/utils/helper.funcs';
import { ReactComponent as CheckboxIcon } from '../../../assets/icons/checkbox.svg';
import { ReactComponent as CheckboxChackedIcon } from '../../../assets/icons/checkbox-chacked.svg';
import * as Styled from './filter-list.styled';

interface IProps {
  obj: {
    key: string;
    values: string[];
  };
  onChange: (key: string, value: string) => void;
  isChecked: (key: string, value: string) => boolean;
}

export const FilterListComponent: React.FC<IProps> = ({ obj, onChange, isChecked }) => (
  <Styled.Wrapper>
    {obj.values.map((val) => (
      <FormControlLabel
        key={uuid()}
        label={helperFuncs.modifyFirstChar(val)}
        control={
          <Styled.CustomCheckbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxChackedIcon />}
            value={val}
            checked={isChecked(obj.key, val)}
            onChange={() => onChange(obj.key, val)}
          />
        }
      />
    ))}
  </Styled.Wrapper>
);
