import { IBagItem } from '../../store/slices/bag/bag.slice';
import jwt_decode from 'jwt-decode';
import { IUser } from '../types/user.type';

class HelperFuncs {
  modifyFirstChar(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  modifyText(str: string): string {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  cutText(str: string, length = 100): string {
    return str.slice(0, length);
  }

  cutByDote(str: string, length = 2) {
    return str.split('.').slice(0, length).join('.') + '.';
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

  getModifyQueryParams(queryParams?: string) {
    if (!queryParams?.length) {
      return '';
    }

    const params = queryParams?.slice(1).split('&');

    const anotherParams = params?.map((param) => {
      const items = param.split('=');

      let modifyKey = items[0]
        .split('+')
        .map((it, i) => (!i ? it : helperFuncs.modifyFirstChar(it)))
        .join('');

      if (modifyKey === 'pairWith') {
        modifyKey = 'dish';
      }

      const getModifyValues = () => {
        switch (modifyKey) {
          case 'color':
          case 'event':
          case 'type':
            return items[1]
              .toUpperCase()
              .split('%2F')
              .map((el) => el.split('+').join('_'))
              .join(',');
          case 'sortByPopularity':
          case 'sortByPrice':
            return items[1] === 'high+to+low' ? 'ASC' : 'DESC';
          default:
            return items[1].split('%2F').join(',');
        }
      };

      const modifyValues = getModifyValues();

      return modifyKey + '=' + modifyValues;
    });

    return '?' + anotherParams?.join('&');
  }
}

const helperFuncs = new HelperFuncs();
export default helperFuncs;
