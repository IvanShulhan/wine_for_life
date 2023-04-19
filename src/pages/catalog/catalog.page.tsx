import { ContentWrapperComponent } from '../../components/content-wrapper';
import { FooterComponent } from '../../components/footer';
import { HeaderComponent } from '../../components/header';
import { ProductListComponent } from '../../components/product-list';
import { SidebarComponent } from '../../components/sidebar';
import { TitleComponent } from '../../components/title';
import { useAppSelector } from '../../store/app/hooks';
import { selectProductsStatus } from '../../store/slices/products/products.slice';
import './catalog.scss';

export const CatalogPage = () => {
  return (
    <div className="catalog">
      <HeaderComponent hasSearch={true} />
      <div className="catalog__inner">
        <div className="catalog__title-block">
          <TitleComponent title="Catalog" isLarge={true} />
        </div>
        <div className="container">
          <div className="catalog__content">
            <SidebarComponent />
            <ProductListComponent />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
