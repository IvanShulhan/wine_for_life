import React from 'react';
import { IProduct } from '../../common/types/product.type';
import { TitleComponent } from '../title';
import { Link } from 'react-router-dom';
import { ButtonComponent } from '../button';
import { ColorShema } from '../../common/types/button-types.enum';
import helperFuncs from '../../common/utils/helper.funcs';
import './product-card.scss';

// delete
import bottle from '../../assets/images/bottle.png';

interface IProps {
  product: IProduct;
}

export const ProductCardComponent: React.FC<IProps> = React.memo(({ product }) => (
  <div className="product-card">
    <Link className="product-card__link" to={`${product.id}`}>
      <TitleComponent title={product.name} />
      <div className="product-card__image-box">
        <img src={bottle} alt="bottle of good wine" className="product-card__image" />
      </div>
      <p className="product-card__description">{helperFuncs.cutText(product.taste, 80)}</p>
    </Link>
    <div className="product-card__price-box">
      <div className="product-card__price">${product.price}</div>
      <div className="product-card__button-wrapper">
        <ButtonComponent text="Add to bag" colorSchema={ColorShema.red} />
      </div>
    </div>
  </div>
));

ProductCardComponent.displayName = 'ProductCardComponent';
