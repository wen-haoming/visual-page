export const judgePointAt = (props: { offsetX: number; width: number }) => {
  const { offsetX, width } = props;

  const w = width,
    xpos = w / 2;

  let direct = '';

  if (offsetX >= xpos) {
    direct = 'right';
  }
  if (offsetX < xpos) {
    direct = 'left';
  }
  return direct;
};
