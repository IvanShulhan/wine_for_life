import { AxiosResponse } from 'axios';
import HttpSerivce from './http.service';
import { ILoginUser, IUser } from '../common/types/user.type';
import { BACKEND_KEYS } from '../common/consts';
import { IOrder } from '../common/types/order.type';

class OrderService extends HttpSerivce {
  async makeOrder(body: IOrder) {
    const res = await this.post<ILoginUser, AxiosResponse<IUser>>(
      { url: BACKEND_KEYS.ORDER, data: body },
      false
    );
    return res;
  }
}

const orderService = new OrderService();
export default orderService;
