import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/app/hooks';
import { addToBag } from '../../store/slices/bag/bag.slice';
import { HeaderComponent } from '../../components/header';
import { TitleComponent } from '../../components/title';
import { ButtonComponent } from '../../components/button';
import { CounterComponent } from '../../components/counter';
import { ColorShema } from '../../common/types/button-types.enum';
import { DescriptionItemComponent } from '../../components/description-item';
import cheese from '../../assets/icons/cheese.svg';
import grape from '../../assets/icons/grape.svg';
import taste from '../../assets/icons/tasre.svg';
import temperature from '../../assets/icons/temperature.svg';
import './details.scss';

// delete
import bottle from '../../assets/images/large__bottle.png';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import productsService from '../../services/products.service';
import { IProduct } from '../../common/types/product.type';

export const DetailsPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { search } = useLocation();
  const [serchParams, setSearchParams] = useSearchParams(search);
  const [count, setCount] = useState(+(serchParams.get('count') || 0));
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();

  useEffect(() => {
    productsService.getProduct(+id).then(({ data }) => setProduct(data));
  }, []);

  const addHandler = () => {
    product && dispatch(addToBag({ item: { count, product } }));
  };

  useEffect(() => {
    count > 0 ? serchParams.set('count', count.toString()) : serchParams.delete('count');
    setSearchParams(serchParams);
  }, [count]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <section className="details">
      <HeaderComponent />
      <div className="container">
        {product ? (
          <div className="details__inner">
            <span className="details__navigation-wrapper">
              <NavigationComponent currentPage="Details" />
            </span>
            <div className="details__content">
              <div className="details__content-item">
                <div className="details__image-block">
                  <img src={bottle} alt="bottle fo wine" className="details__image" />
                </div>
              </div>
              <div className="details__content-item">
                <div className="details__description-block">
                  <div className="details__description-header">
                    <TitleComponent title={product.name} isLarge={true} />
                    <span className="details__price">${product.price}</span>
                    <div className="details__buttons-wrapper">
                      <CounterComponent
                        value={count}
                        increaseFn={increaseCount}
                        decreaseFn={decreaseCount}
                      />
                      <ButtonComponent
                        onClick={addHandler}
                        colorSchema={ColorShema.red}
                        text="Add to bag"
                      />
                    </div>
                  </div>
                  <div className="details__description">
                    <DescriptionItemComponent name="Type" text={product.type} />
                    <DescriptionItemComponent name="Vine color" text={product.color} />
                    <DescriptionItemComponent name="Vintage" text={product.vintage} />
                    <DescriptionItemComponent name="Country" text={product.manufactured.country} />
                    <DescriptionItemComponent name="Region" text={product.manufactured.region} />
                    <DescriptionItemComponent name="Grape" text={product.grape} />
                  </div>
                  <div className="details__taste">
                    <h4 className="details__taste-title">Taste</h4>
                    <p className="details__taste-text">{product.taste}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="details__cards">
              <div className="details__card">
                <h4 className="details__card-title">Pairing</h4>
                <img src={cheese} alt="cheese" className="details__card-icon" />
                <p className="details__card-text">
                  Perfect for all types of aperitifs, fish, rice, smoked dishes, white meat and
                  cheese.
                </p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Grape variety</h4>
                <img src={grape} alt="grape" className="details__card-icon" />
                <p className="details__card-text">100% {product.grape}</p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Taste</h4>
                <img src={taste} alt="taste" className="details__card-icon" />
                <p className="details__card-text">Warm, creamy and very pleasant con the palate.</p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Temperature</h4>
                <img src={temperature} alt="taste" className="details__card-icon" />
                <p className="details__card-text">Serve between {product.temperature} C.</p>
              </div>
            </div>
          </div>
        ) : (
          <>Product not found</>
        )}
      </div>
    </section>
  );
};
