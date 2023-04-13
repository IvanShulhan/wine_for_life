import { AxiosResponse } from 'axios';
import HttpSerivce from './http.service';
import { IUpdateUser, IUser } from '../common/types/user.type';
import { BACKEND_KEYS } from '../common/consts';

class UserService extends HttpSerivce {
  async getUser(id: number) {
    const res = await this.get<IUser>({ url: `${BACKEND_KEYS.USERS}/${id}` }, false);
    return res;
  }

  async removeAccount(id: number) {
    const res = await this.delete({ url: `${BACKEND_KEYS.USERS}/${id}` }, false);
    return res;
  }

  async updateUser(id: number, body: IUpdateUser) {
    const res = await this.patch<IUpdateUser, AxiosResponse<IUser>>(
      { url: `${BACKEND_KEYS.USERS}/${id}`, data: body },
      false
    );
    return res;
  }
}

const userService = new UserService();
export default userService;
