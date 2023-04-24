import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/app/hooks';
import { addToBag } from '../../store/slices/bag/bag.slice';
import productsService from '../../services/products.service';
import { IProduct } from '../../common/types/product.type';
import { FooterComponent } from '../../components/footer';
import helperFuncs from '../../common/utils/helper.funcs';
import { HeaderComponent } from '../../components/header';
import { TitleComponent } from '../../components/title';
import { ButtonComponent } from '../../components/button';
import { CounterComponent } from '../../components/counter';
import { ColorShema } from '../../common/types/button-types.enum';
import { DescriptionItemComponent } from '../../components/description-item';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import cheese from '../../assets/icons/cheese.svg';
import grape from '../../assets/icons/grape.svg';
import taste from '../../assets/icons/tasre.svg';
import temperature from '../../assets/icons/temperature.svg';
import './details.scss';

type Status = 'idle' | 'loading';

import useMediaQuery from '../../common/utils/useMediaQuery.hook';
import { ContentWrapperComponent } from '../../components/content-wrapper';

export const DetailsPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const { search } = useLocation();
  const [serchParams, setSearchParams] = useSearchParams(search);
  const [count, setCount] = useState(+(serchParams.get('count') || 0));
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const isTablet = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setStatus('loading');
    productsService.getProduct(+id).then(({ data }) => {
      setStatus('idle');
      setProduct(data);
    });

    return () => {
      setStatus('idle');
    };
  }, []);

  const addHandler = () => {
    product && dispatch(addToBag({ item: { count, product } }));
    setCount(0);
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
      <div className="details__wrapper">
        <ContentWrapperComponent status={status} />
        <div className="container">
          <div className="details__inner">
            <span className="details__navigation-wrapper">
              <NavigationComponent currentPage="Details" />
            </span>
            <div className="details__content">
              <div className="details__content-item">
                {isTablet && (
                  <div className="details__top-title-block">
                    <TitleComponent title={product?.name || 'Wine'} />
                  </div>
                )}
                <div className="details__image-block">
                  <img src={product?.imageLink} alt="bottle fo wine" className="details__image" />
                </div>
              </div>
              <div className="details__content-item">
                <div className="details__description-block">
                  <div className="details__description-header">
                    {!isTablet && <TitleComponent title={product?.name || 'Wine'} isLarge={true} />}
                    <span className="details__price">${product?.price}</span>
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
                  <div className="details__description-wrapper">
                    <div className="details__description">
                      <DescriptionItemComponent name="Type" text={product?.type} />
                      <DescriptionItemComponent name="Vine color" text={product?.color} />
                      <DescriptionItemComponent name="Vintage" text={product?.vintage} />
                      <DescriptionItemComponent name="Country" text={product?.country} />
                      <DescriptionItemComponent name="Region" text={product?.region} />
                      <DescriptionItemComponent name="Grape" text={product?.grape} />
                    </div>
                    <div className="details__taste">
                      <h4 className="details__taste-title">Taste</h4>
                      <p className="details__taste-text">{product?.taste}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details__cards">
              <div className="details__card">
                <h4 className="details__card-title">Pairing</h4>
                <img src={cheese} alt="cheese" className="details__card-icon" />
                <p className="details__card-text">{product?.pairing}</p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Grape variety</h4>
                <img src={grape} alt="grape" className="details__card-icon" />
                <p className="details__card-text">{product?.grape}</p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Taste</h4>
                <img src={taste} alt="taste" className="details__card-icon" />
                <p className="details__card-text">{helperFuncs.cutByDote(product?.taste || '')}</p>
              </div>
              <div className="details__card">
                <h4 className="details__card-title">Temperature</h4>
                <img src={temperature} alt="taste" className="details__card-icon" />
                <p className="details__card-text">{product?.temperature}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </section>
  );
};
