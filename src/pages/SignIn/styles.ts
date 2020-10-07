import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 22px;
  width: 100%;

  img {
    max-width: 800px;
    width: 100%;
  }
`;

export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  padding: 44px;

  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  h1 {
    font-size: 64px;
    font-weight: 700;
    color: #547eff;
    text-align: center;
    margin-bottom: 40px;
  }

  input {
    background: #f3f2f2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0;
    min-width: 350px;
    width: 100%;
    height: 50px;
    padding: 0 24px;
    margin-bottom: 22px;
  }

  button {
    background: #547eff;
    border-radius: 10px;
    border: 0;
    height: 50px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 40px;
    color: #fff;
    text-transform: uppercase;
  }
`;
