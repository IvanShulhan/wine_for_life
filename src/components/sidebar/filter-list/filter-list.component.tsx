import { v4 as uuid } from 'uuid';
import helperFuncs from '../../../common/utils/helper.funcs';
import { ReactComponent as CheckboxIcon } from '../../../assets/icons/checkbox.svg';
import { ReactComponent as CheckboxChackedIcon } from '../../../assets/icons/checkbox-chacked.svg';
import './filter-list.scss';

interface IProps {
  obj: {
    key: string;
    values: string[];
  };
  onChange: (key: string, value: string) => void;
  isChecked: (key: string, value: string) => boolean;
}

export const FilterListComponent: React.FC<IProps> = ({ obj, onChange, isChecked }) => (
  <div className="filter-list">
    {obj.values.map((val) => (
      <label className="filter-list__label" key={uuid()}>
        <input
          type="checkbox"
          className="filter-list__input"
          checked={isChecked(obj.key, val)}
          onChange={() => onChange(obj.key, val)}
        />
        <span className="filter-list__text">{helperFuncs.modifyFirstChar(val)}</span>
        {!isChecked(obj.key, val) ? <CheckboxIcon /> : <CheckboxChackedIcon />}
      </label>
    ))}
  </div>
);
