import { IBagItem } from '../../store/slices/bag/bag.slice';
import jwt_decode from 'jwt-decode';
import { IUser } from '../types/user.type';

class HelperFuncs {
  modifyFirstChar(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  cutText(str: string, length = 100): string {
    return str.slice(0, length);
  }

  getLocalStorageData(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  getTotalPrice(obj: IBagItem[]) {
    return obj.reduce((acc, el) => acc + el.product.price * el.count, 0);
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomAdress(list: string[]) {
    return [...Array(3)].map((_, i) => {
      const randomStreet = list[helperFuncs.randomIntFromInterval(0, list.length - 1)];
      const randomNum = helperFuncs.randomIntFromInterval(1, 59);

      return `№${i + 1} ${randomStreet}, ${randomNum}`;
    });
  }

  getUserFromToken(srt: string): IUser {
    return jwt_decode(srt);
  }
}

const helperFuncs = new HelperFuncs();
export default helperFuncs;
