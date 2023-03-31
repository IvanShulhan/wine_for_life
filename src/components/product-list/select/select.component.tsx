import { Box, Typography } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowTop } from '../../../assets/icons/arrow-top.svg';
import helperFuncs from '../../../common/utils/helper.funcs';
import * as Styled from './select.styled';

interface IProps {
  name: string;
  values: string[];
}

export const SelectComponent: React.FC<IProps> = React.memo(({ name, values }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [filterValue, setFilterValue] = useState(searchParams.get(name) || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    setFilterValue(value);
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <Box>
      <Styled.CustomSelect open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Typography>
          {filterValue
            ? helperFuncs.modifyFirstChar(filterValue)
            : helperFuncs.modifyFirstChar(name)}
        </Typography>
        {isOpen ? <ArrowTop /> : <ArrowDown />}
        {isOpen && (
          <Styled.List>
            {values.map((it) => (
              <Styled.ListItem key={uuid()}>
                <Styled.Button onClick={() => handleChange(it)}>
                  {helperFuncs.modifyFirstChar(it)}
                </Styled.Button>
              </Styled.ListItem>
            ))}
          </Styled.List>
        )}
      </Styled.CustomSelect>
      {isOpen && <Styled.Mask onClick={() => setIsOpen(false)} />}
    </Box>
  );
});

SelectComponent.displayName = 'SelectComponent';
