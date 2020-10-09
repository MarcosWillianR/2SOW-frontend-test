import styled from 'styled-components';
import { shade } from 'polished';
import { Form as UnformForm } from '@unform/web';

import registerBackground from '../../assets/register-background.png';

export const Container = styled.div`
  width: 100%;
  background: url(${registerBackground}) no-repeat;
  background-size: contain;
  background-position: 50% center;
  height: 100vh;

  .react-loading-skeleton {
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    height: 49px;
  }

  > header {
    width: 100%;
    background: #f3f2f2;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

    padding: 22px 26px;

    a {
      text-decoration: none;
      font-size: 48px;
      font-weight: 700;
      color: #547eff;
      text-align: center;
      margin-left: 15px;
    }

    div {
      margin: 0 auto;
      width: 100%;
      max-width: 1100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    button {
      border: 0;
      background: transparent;

      svg {
        color: #547eff;
        transition: color 0.5s;

        &:hover {
          color: ${shade(0.1, '#547EFF')};
        }
      }
    }
  }
`;

export const Form = styled(UnformForm)`
  width: 100%;
  max-width: 477px;
  margin: 80px auto 26px auto;
  background: #fff;

  display: flex;
  flex-direction: column;
  padding: 0 41px;

  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  .unform_input {
    margin: 0;
  }

  .unform_input + .unform_input,
  .unform_input:nth-child(5),
  #input_cidade {
    margin-top: 30px;
  }

  #input_bairro {
    width: 260px;
  }

  #input_numero {
    width: 170px;
  }

  button {
    margin: 60px 0;
  }
`;

export const FormTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px 0;

  h1 {
    font-size: 24px;
    font-weight: 500;
    color: #547eff;
    text-align: center;
    line-height: 1.5;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    color: #9f9999;
    max-width: 190px;
    text-align: center;
    line-height: 1.5;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .unform_input {
    width: 190px;
    min-width: auto;
  }

  .unform_input:nth-child(2) {
    margin-top: 0;
    margin-left: 30px;
  }
`;
