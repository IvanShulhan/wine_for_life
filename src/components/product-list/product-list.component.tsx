import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { SelectComponent } from '../select';
import { ButtonComponent } from '../button';
import { useLocation, useSearchParams } from 'react-router-dom';
import { LoaderComponent } from '../loader';
import { ProductCardComponent } from '../product-card';
import {
  getMoreProducts,
  getProducts,
  selectProducts,
  selectProductsStatus
} from '../../store/slices/products/products.slice';
import './product-list.scss';
import { TitleComponent } from '../title';
import classNames from 'classnames';

const sortValues = ['low to high', 'high to low'];

interface IProps {
  onClick: () => void;
  isPhone: boolean;
}

export const ProductListComponent: React.FC<IProps> = React.memo(({ isPhone, onClick }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const currentPage = searchParams.get('page') || 0;
  const popularityValue = searchParams.get('sort by popularity') || '';
  const priceValue = searchParams.get('sort by price') || '';
  const status = useAppSelector(selectProductsStatus);

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
      <div
        className={classNames('product-list__header', {
          'product-list__header--is-visible': (products.length && status === 'idle') || true
        })}>
        <SelectComponent name="sort by popularity" values={sortValues} isDisabled={true} />
        <SelectComponent name="sort by price" values={sortValues} isDisabled={true} />
        {isPhone && (
          <button className="product-list__button" onClick={onClick}>
            Filter
          </button>
        )}
      </div>
      {status === 'loading' && (
        <div className="product-list__info">
          <LoaderComponent />
        </div>
      )}
      {Boolean(products.length) && status === 'idle' && (
        <div className="product-list__content">
          <ul className="product-list__list">
            {products.map((product) => (
              <li className="product-list__list-item" key={product.id}>
                <ProductCardComponent product={product} />
              </li>
            ))}
          </ul>
          <ButtonComponent text="Load more" outlined={true} onClick={increasePage} />
        </div>
      )}
      {!products.length && status === 'idle' && (
        <div className="product-list__info">
          <TitleComponent title="No products were found according to your filters" />
        </div>
      )}
    </div>
  );
});

ProductListComponent.displayName = 'ProductListComponent';
