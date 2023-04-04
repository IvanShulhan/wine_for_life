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
}

const helperFuncs = new HelperFuncs();
export default helperFuncs;
