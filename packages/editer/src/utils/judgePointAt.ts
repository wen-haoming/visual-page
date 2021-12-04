export const judgePointAt = (props: {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}) => {

  
  const { offsetX, offsetY, width, height } = props;
  
  const w = width,
    h = height,
    xpos = w / 2,
    ypos = h / 2;
  
    let direct = '';

    var angle = Math.atan((offsetX - xpos)/(offsetY - ypos)) * 180 / Math.PI;
    if(angle > -45 && angle < 45 && offsetY > ypos){
      direct = "down";
    }
    if(angle > -45 && angle < 45 && offsetY < ypos){
      direct = "up";
    }
    if(((angle > -90 && angle <-45) || (angle >45 && angle <90)) && offsetX > xpos){
      direct = "right";
    }
    if(((angle > -90 && angle <-45) || (angle >45 && angle <90)) && offsetX < xpos){
      direct = "left";
    }
  return direct;
};
