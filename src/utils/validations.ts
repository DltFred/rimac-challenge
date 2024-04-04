/* eslint-disable */

export const verifyPhone = (value: any): any => {
  const regex = /^[0-9]*$/
  if (value !== undefined) {    
    return !regex.test(value) || value.length != 9 || value.charAt(0) != 9 ? false : true
  }
}

export const verifyDNI = (value: string): any => {
  let regex = /^[0-9]*$/;
  if (value != undefined) {
    return !regex.test(value) || value.length != 8 ? false : true;
  }
}

export const verifyCE = (value: string): any => {
  while (value != undefined) {
    return (value.length != 0 && value.length >= 8);
  }
}