import { Icon, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { Input } from './search.styled';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';
import { useLocation, useSearchParams } from 'react-router-dom';

export const SearchComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [value, setValue] = useState(searchParams.get('query') || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
    setValue(value);
  };

  return (
    <Input
      fullWidth
      variant="outlined"
      name="search"
      placeholder="Search"
      value={value}
      onChange={handleChange}
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
