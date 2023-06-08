/**
 * Email 검증
 * @description `@`를 반드시 포함하고 `@` 전후에 2자 이상의 문자를 포함하는 적절한 이메일 형식인지 판별
 * @param {string} email 이메일
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email) return true;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * ID 검증
 * @description 영어 대,소문자 혹은 ., _으로 구성된 5자 이상 20자 이하의 문자열인지 판별
 * @param {string} id 아이디
 * @returns {boolean}
 */
function isValidID(id) {
  if (!id) return true;
  const regex = /^[a-zA-Z0-9._]{5,20}$/;
  return regex.test(id);
}

/**
 * PW 검증
 * @description 영어 대문자, 소문자, 숫자, 특수문자가 각각 최소 하나 이상 포함된 8자 이상 20자 이하의 문자열인지 판별
 * @param {string} password 비밀번호
 * @category Utility
 * @returns boolean
 */
function isValidPW(password) {
  if (!password) return true;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonAlphas = /\W/.test(password);
  const between8To20 = 8 <= password.length <= 20;

  return (
    hasUpperCase && hasLowerCase && hasNumbers && hasNonAlphas && between8To20
  );
}

/**
 * PW 동일성 검증
 * @description 비밀번호와 비밀번호 확인 문자열이 동일한지 판별
 * @param {string} password 비밀번호
 * @param {string} check 재입력한 비밀번호
 * @returns {boolean}
 */
function isValidCheck(password, check) {
  if (!check) return true;
  return password === check;
}

export { isValidEmail, isValidID, isValidPW, isValidCheck };
