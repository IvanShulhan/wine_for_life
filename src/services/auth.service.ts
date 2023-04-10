import { AxiosResponse } from 'axios';
import HttpSerivce from './http.service';
import { ILoginUser, IRegisterUser, IUser } from '../common/types/user.type';
import { BACKEND_KEYS } from '../common/consts';

class AuthService extends HttpSerivce {
  async registerUser(body: IRegisterUser) {
    const res = await this.post<IRegisterUser, AxiosResponse<string>>(
      { url: BACKEND_KEYS.SIGN_UP, data: body },
      false
    );
    return res;
  }

  async loginUser(body: ILoginUser) {
    const res = await this.post<ILoginUser, AxiosResponse<IUser>>(
      { url: BACKEND_KEYS.LOG_IN, data: body },
      false
    );
    return res;
  }
}

const authService = new AuthService();
export default authService;
