import { Fragment, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { ProductCardComponent } from '../product-card';
import { SelectComponent } from '../select';
import { ButtonComponent } from '../button';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts, selectProducts } from '../../store/slices/products/products.slice';
import './product-list.scss';

const sortValues = ['low to high', 'high to low'];

export const ProductListComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    dispatch(getProducts(search));
  }, [page]);

  const increasePage = () => {
    setPage(+page + 1);
  };

  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts(search));
  }, []);

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
