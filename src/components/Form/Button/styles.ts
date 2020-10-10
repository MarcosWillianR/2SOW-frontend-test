import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  margin-top: 40px;

  width: 100%;
  background: #547eff;
  border-radius: 10px;
  border: 0;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;

  span {
    margin: 0 auto;
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-top-color: #547eff;

    animation: ${spin} 1s linear infinite;
  }
`;
