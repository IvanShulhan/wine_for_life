import React from 'react';
import { IProduct } from '../../common/types/product.type';
import { TitleComponent } from '../title';
import { Link } from 'react-router-dom';
import { ButtonComponent } from '../button';
import { ColorShema } from '../../common/types/button-types.enum';
import helperFuncs from '../../common/utils/helper.funcs';
import { useAppDispatch } from '../../store/app/hooks';
import { addToBag } from '../../store/slices/bag/bag.slice';
import './product-card.scss';

// delete
import bottle from '../../assets/images/bottle.png';
import { ROUTER_KEYS } from '../../common/consts';

interface IProps {
  product: IProduct;
}

export const ProductCardComponent: React.FC<IProps> = React.memo(({ product }) => {
  const dispatch = useAppDispatch();

  const addHandler = () => {
    product && dispatch(addToBag({ item: { count: 1, product } }));
  };

  return (
    <div className="product-card">
      <Link
        className="product-card__link"
        to={`${ROUTER_KEYS.CATALOG}${ROUTER_KEYS.DETAILS}/${product.id}`}>
        <TitleComponent title={product.name} />
        <div className="product-card__image-box">
          <img src={bottle} alt="bottle of good wine" className="product-card__image" />
        </div>
        <p className="product-card__description">{helperFuncs.cutText(product.taste, 80)}</p>
      </Link>
      <div className="product-card__price-box">
        <div className="product-card__price">${product.price}</div>
        <div className="product-card__button-wrapper">
          <ButtonComponent onClick={addHandler} text="Add to bag" colorSchema={ColorShema.red} />
        </div>
      </div>
    </div>
  );
});

ProductCardComponent.displayName = 'ProductCardComponent';
