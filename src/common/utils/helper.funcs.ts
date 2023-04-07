import { IBagItem } from '../../store/slices/bag/bag.slice';

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
}

const helperFuncs = new HelperFuncs();
export default helperFuncs;
