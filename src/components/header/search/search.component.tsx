import { useState } from 'react';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';
import { useLocation, useSearchParams } from 'react-router-dom';
import './search.scss';

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
    <div className="search">
      <input
        placeholder="Search"
        type="text"
        className="search__input"
        value={value}
        onChange={handleChange}
      />
      <Search className="search__icon" />
    </div>
  );
};
