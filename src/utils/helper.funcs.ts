class HelperFuncs {
  modifyFirstChar(str: string): string {
    return str[0].toUpperCase() + str.slice(1)
  }
}

const helperFuncs = new HelperFuncs();
export default helperFuncs;
