export const swap = (array: any[], first: number, second: number) => {
  var tmp = array[second];
  array[second] = array[first];
  array[first] = tmp;
  return array;
};
