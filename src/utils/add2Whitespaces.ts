/**
 * 2개의 whitespace 공백 추가: e.g. "아이디" -> "아이디&nbsp;&nbsp;"
 * @param {string} str
 * @returns string
 */
const add2Whitespaces = (str: string): string => {
  return str + "\u00A0" + "\u00A0";
};

export default add2Whitespaces;
