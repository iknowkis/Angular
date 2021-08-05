  
/**
 * 값이 null이나 undefined인 경우에 빈 문자열을 넣어주기 위한 헬퍼 함수
 * @param param<string | null | undefined>
 * @returns ''
 */
 export function preventNullWithEmptyString(param: string | null | undefined) {
    if (!param) return '';
    else return param;
  }