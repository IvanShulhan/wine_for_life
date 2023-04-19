import { Fragment, useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { ProductCardComponent } from '../product-card';
import { SelectComponent } from '../select';
import { ButtonComponent } from '../button';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  getMoreProducts,
  getProducts,
  selectProducts
} from '../../store/slices/products/products.slice';
import './product-list.scss';

const sortValues = ['low to high', 'high to low'];

export const ProductListComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const currentPage = searchParams.get('page') || 0;
  const popularityValue = searchParams.get('sort by popularity') || '';
  const priceValue = searchParams.get('sort by price') || '';

  const [page, setPage] = useState(+currentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page) {
      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
    }
  }, [page]);

  const increasePage = () => {
    setPage(page + 1);
  };

  const products = useAppSelector(selectProducts);

  useEffect(() => {
    setPage(0);
    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [popularityValue, priceValue]);

  useEffect(() => {
    if (currentPage) {
      dispatch(getMoreProducts(search));
    } else {
      dispatch(getProducts(search));
    }
  }, [popularityValue, priceValue, currentPage]);

  return (
    <div className="product-list">
      <div className="product-list__header">
        <SelectComponent name="sort by popularity" values={sortValues} />
        <SelectComponent name="sort by price" values={sortValues} />
      </div>
      <div className="product-list__content">
        {products.map((product) => (
          <Fragment key={product.id}>
            <ProductCardComponent product={product} />
          </Fragment>
        ))}
        <ButtonComponent text="Load more" outlined={true} onClick={increasePage} />
      </div>
    </div>
  );
};
