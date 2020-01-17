export const DateUtils = {
  intToString: (entier) => {
    if (-9<= entier && entier <=9 ){
      return `0${entier}`;
    } else {
        return `${entier}`;
    }
  }
}
