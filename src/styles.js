import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`

`;

export const mq = {
  desktop: 1200,
  mobile: 700,
};

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeIn = css`
  animation: fade-in 1s ease-in-out;
`;

export const mixins = {
  flexCenter,
  fadeIn,
};
