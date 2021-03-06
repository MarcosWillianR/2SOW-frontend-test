import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

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

export const Form = styled(UnformForm)`
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
`;
