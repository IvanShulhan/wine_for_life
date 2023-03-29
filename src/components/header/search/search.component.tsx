import { Icon, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { Input } from './search.styled';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';

export const SearchComponent = () => {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <Input
      fullWidth
      variant="outlined"
      name="search"
      placeholder="Search"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon>
              <Search />
            </Icon>
          </InputAdornment>
        )
      }}
    />
  );
};
