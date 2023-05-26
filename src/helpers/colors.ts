/* eslint-disable */

type ColorSet = {
    [key: string]: string;
  };
  
  export const Colors: ColorSet = {
    Gray: "#7E7D7B",
    LightGray: "#EFEBE8",
    LightYellow: "#F1EDEA",
    DarkYellow: "#B89503",
    White: "#FFFFFF",
    Blue: "#1357A6",
    Red: "#800000",
  };
  
  export const TempColors = (temp: number) => {
    const { Blue, DarkYellow, Red } = Colors;
  
    return temp < 16 ? Blue : temp >= 35 ? Red : DarkYellow;
  };
  