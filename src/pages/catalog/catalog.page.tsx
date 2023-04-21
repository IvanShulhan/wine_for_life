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
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  useEffect(() => {
    if (!isPhone && isVisibleFilter) {
      setIsVisibleFilter(false);
    }
  }, [isPhone]);

  const handleIsOpen = () => {
    window.scrollTo({ top: 0 });
    setIsVisibleFilter(!isVisibleFilter);
  };

  useEffect(() => {
    isVisibleFilter
      ? document.body.classList.add('is-open-filter')
      : document.body.classList.remove('is-open-filter');
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
            <SidebarComponent isOpen={isPhone && isVisibleFilter} onClick={handleIsOpen} />
            <ProductListComponent isPhone={isPhone} onClick={handleIsOpen} />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
