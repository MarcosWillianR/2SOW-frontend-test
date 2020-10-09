import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 350px) 150px 200px 130px repeat(2, 80px);
  grid-gap: 22px;
  padding: 20px 41px 20px 41px;
  align-items: center;

  & + div {
    border-top: 1px solid #c4c4c4;
  }

  button {
    border: 0;
    background: transparent;
  }

  span,
  button {
    border-radius: 10px;
  }
`;
