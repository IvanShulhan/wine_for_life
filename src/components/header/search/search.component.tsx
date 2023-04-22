import { useEffect, useState } from 'react';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';
import { useLocation, useSearchParams } from 'react-router-dom';
import './search.scss';
import { useAppDispatch } from '../../../store/app/hooks';
import { getProducts } from '../../../store/slices/products/products.slice';

export const SearchComponent = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const currentSearchVavue = searchParams.get('query') || '';
  const [value, setValue] = useState(currentSearchVavue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }
    searchParams.delete('page');
    setSearchParams(searchParams);
    setValue(value);
  };

  useEffect(() => {
    dispatch(getProducts(search));
  }, [currentSearchVavue]);

  return (
    <div className="search">
      <input
        placeholder="Search"
        disabled
        type="text"
        className="search__input"
        value={value}
        onChange={handleChange}
      />
      <Search className="search__icon" />
    </div>
  );
};
