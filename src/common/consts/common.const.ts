/* eslint-disable no-useless-escape */
export const COMMON_CONST = {
  PHONE_REGEX: /\+?\(?([0-9]{3})\)?[-.]?\(?([0-9]{3})\)?[-.]?\(?([0-9]{4})\)?/,
  DIGIT_REGEX: /^\d+$/,
  ONLY_CHAR_REGEX: /^[aA-zZ\s]+$/,
  MIN_LENGTH: /^.{8,}$/,
  PHONE_NUMBER: /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/,
  ONE_NUMBER: /(?=.*?[0-9]).*/,
  DATE_REGEX: /^(19\d\d|20([0-1]\d|2[0-2]))-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[01])$/
};
