import { HeaderComponent } from '../../components/header';
import { ProductListComponent } from '../../components/product-list';
import { SidebarComponent } from '../../components/sidebar';
import { TitleComponent } from '../../components/title';
import './catalog.scss';

export const CatalogPage = () => {
  return (
    <section className="catalog">
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
    </section>
  );
};
