import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #f3f2f2;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding: 13px 0 13px 26px;
    align-self: stretch;
    border: 0;
    background: transparent;
    font-size: 18px;
    color: #222;

    &::placeholder {
      color: #9f9999;
    }
  }

  svg {
    margin: 0 26px;
  }
`;
