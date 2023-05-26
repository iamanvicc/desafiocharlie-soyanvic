  // Converter de Celsius para Fahrenheit:
export const getCelsiusToFahrenheit = (celsius: number): number =>
  Number(((celsius * 9) / 5 + 32).toFixed(2));

// Coloca a primeira letra em maiúsculo:
export const firstLetterUppercase = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
