import HttpSerivce from './http.service';
import { BACKEND_KEYS } from '../common/consts';
import { IProduct } from '../common/types/product.type';

class ProductsService extends HttpSerivce {
  async getAllProducts(queryParams = '') {
    const res = await this.get<IProduct[]>(
      { url: `${BACKEND_KEYS.PRODUCTS}${queryParams && `${queryParams}`}` },
      false
    );
    return res;
  }

  async getProduct(id: number) {
    const res = await this.get<IProduct>({ url: `${BACKEND_KEYS.PRODUCTS}/${id}` }, false);
    return res;
  }
}

const productsService = new ProductsService();
export default productsService;
