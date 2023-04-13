/* eslint-disable no-useless-escape */
export const COMMON_CONST = {
  PHONE_REGEX: /\+?\(?([0-9]{3})\)?[-.]?\(?([0-9]{3})\)?[-.]?\(?([0-9]{4})\)?/,
  DIGIT_REGEX: /^\d+$/,
  ONLY_CHAR_REGEX: /^[aA-zZ\s]+$/,
  MIN_LENGTH: /^.{8,}$/,
  PHONE_NUMBER: /^\+380\(\d{2}\) \d{3}-\d{2}-\d{2}$/,
  ONE_NUMBER: /(?=.*?[0-9]).*/,
  DATE_REGEX:
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g
};
