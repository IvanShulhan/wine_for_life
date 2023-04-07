import { HeaderComponent } from '../../components/header';
import { ProductListComponent } from '../../components/product-list';
import { SidebarComponent } from '../../components/sidebar';
import { TitleComponent } from '../../components/title';
import { motion } from 'framer-motion';
import './catalog.scss';

export const CatalogPage = () => {
  return (
    <motion.section
      className="catalog"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}>
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
    </motion.section>
  );
};
