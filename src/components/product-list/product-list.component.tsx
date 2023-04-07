import { Fragment, useState } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectProducts } from '../../store/slices/products/products.slice';
import { ProductCardComponent } from '../product-card';
import { SelectComponent } from '../select';
import './product-list.scss';
import { ButtonComponent } from '../button';
import { useLocation, useSearchParams } from 'react-router-dom';

const sortValues = ['low to high', 'high to low'];

export const ProductListComponent = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [page, setPage] = useState(searchParams.get('page') || 1);

  console.log(search);

  const increasePage = () => {
    setPage(+page + 1);
    searchParams.set('page', `${+page + 1}`);
    setSearchParams(searchParams);
  };

  const products = useAppSelector(selectProducts);

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
