import { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ButtonColors } from '../../common/types/colors.enums';
import { Box } from '@mui/material';
import { TitleComponent } from '../title.component';
import { ButtonComponent } from '../button';
import { filterValues } from '../../common/consts/filterValues.const';
import { FilterListComponent } from './filter-list/filter-list.component';
import helperFuncs from '../../common/utils/helper.funcs';
import * as Styled from './sidebar.styled';

interface IFilterKeys {
  [key: string]: string[];
}

export const SidebarComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

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

  const handleChange = useCallback((key: string, value: string) => {
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
  }, []);

  const onSubmit = () => {
    alert(JSON.stringify(filterKeys));
  };

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        {filterValues.map((obj) => (
          <Box key={uuid()}>
            <Box sx={{ marginBottom: 3 }}>
              <TitleComponent title={helperFuncs.modifyFirstChar(obj.key)} />
            </Box>
            <FilterListComponent obj={obj} onChange={handleChange} isChecked={isChecked} />
          </Box>
        ))}
      </Styled.Inner>
      <ButtonComponent
        onClick={onSubmit}
        text="Apply"
        bgColor={ButtonColors.gray}
        textColor={ButtonColors.white}
      />
    </Styled.Wrapper>
  );
};
