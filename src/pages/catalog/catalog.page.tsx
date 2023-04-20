import { useState, useEffect } from 'react';
import { FooterComponent } from '../../components/footer';
import { HeaderComponent } from '../../components/header';
import { ProductListComponent } from '../../components/product-list';
import { SidebarComponent } from '../../components/sidebar';
import { TitleComponent } from '../../components/title';
import useMediaQuery from '../../common/utils/useMediaQuery.hook';
import './catalog.scss';

export const CatalogPage = () => {
  const isPhone = useMediaQuery('(max-width: 575px)');
  const [isVisibleFilter, setIsVisibleFilter] = useState(!isPhone);

  const handleIsOpen = () => {
    setIsVisibleFilter(!isVisibleFilter);
  };

  useEffect(() => {
    isVisibleFilter
      ? document.body.classList.add('is-open-bag')
      : document.body.classList.remove('is-open-bag');
  }, [isVisibleFilter]);

  return (
    <div className="catalog">
      <HeaderComponent hasSearch={true} />
      <div className="catalog__inner">
        <div className="catalog__title-block">
          <TitleComponent title="Catalog" isLarge={true} />
        </div>
        <div className="container">
          <div className="catalog__content">
            {isPhone && isVisibleFilter && <SidebarComponent />}
            <ProductListComponent isPhone={isPhone} onClick={handleIsOpen} />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
