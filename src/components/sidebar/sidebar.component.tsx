import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { TitleComponent } from '../title';
import { ButtonComponent } from '../button';
import { filterValues } from '../../common/consts/filterValues.const';
import { FilterListComponent } from './filter-list/filter-list.component';
import helperFuncs from '../../common/utils/helper.funcs';
import { ColorShema } from '../../common/types/button-types.enum';
import './sidebar.scss';
import { useAppDispatch } from '../../store/app/hooks';
import { getProducts } from '../../store/slices/products/products.slice';

interface IFilterKeys {
  [key: string]: string[];
}

export const SidebarComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const dispatch = useAppDispatch();

  const getSearcValues = (key: string) => {
    const values = searchParams.get(key);
    return values ? values.split('/') : [];
  };

  const [filterKeys, setFilterKeys] = useState<IFilterKeys>({
    color: getSearcValues('color'),
    type: getSearcValues('type'),
    event: getSearcValues('event'),
    'pair with': getSearcValues('pair with')
  });

  const isChecked = (key: string, value: string) => {
    return filterKeys[key].some((el) => el === value);
  };

  const handleChange = (key: string, value: string) => {
    const values = searchParams.get(key) || '';

    const isChekedValue = isChecked(key, value);
    if (isChekedValue) {
      setFilterKeys((prev) => ({
        ...prev,
        [key]: prev[key].filter((el) => el !== value)
      }));

      const valuesWithoutValue = values
        .split('/')
        .filter((el) => el !== value)
        .join('/');

      valuesWithoutValue.length
        ? searchParams.set(key, valuesWithoutValue)
        : searchParams.delete(key);
    } else {
      setFilterKeys((prev) => ({ ...prev, [key]: [...prev[key], value] }));
      const valuesWithNewValue = values.length ? values + `/${value}` : value;
      searchParams.set(key, valuesWithNewValue);
    }

    setSearchParams(searchParams);
  };

  const onSubmit = () => {
    dispatch(getProducts(search));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        {filterValues.map((obj) => (
          <div className="sidebar__filter-item" key={uuid()}>
            <TitleComponent title={helperFuncs.modifyFirstChar(obj.key)} />
            <FilterListComponent obj={obj} onChange={handleChange} isChecked={isChecked} />
          </div>
        ))}
      </div>
      <ButtonComponent onClick={onSubmit} text="Apply" colorSchema={ColorShema.dark} />
    </div>
  );
};
