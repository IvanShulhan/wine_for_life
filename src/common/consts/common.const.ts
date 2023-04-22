/* eslint-disable no-useless-escape */
export const REGEXES = {
  PHONE: /\+?\(?([0-9]{3})\)?[-.]?\(?([0-9]{3})\)?[-.]?\(?([0-9]{4})\)?/,
  DIGIT: /^\d+$/,
  ONLY_CHAR: /^[aA-zZ\s]+$/,
  MIN_LENGTH: /^.{8,}$/,
  PHONE_NUMBER: /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/,
  ONE_NUMBER: /(?=.*?[0-9]).*/,
  DATE: /^(19\d\d|20([0-1]\d|2[0-2]))-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[01])$/,
  WITHOUT_SPACES: /^\S.*\S$/,
  ONLY_ONE_SPACE: /^(?!.*\s{2,}).*$/
};
