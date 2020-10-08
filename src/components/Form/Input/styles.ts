import styled from 'styled-components';

interface ContainerProps {
  hasIcon: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 22px;
  background: #f3f2f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0;
  min-width: 350px;
  width: 100%;
  height: 50px;
  color: #222;
  display: flex;
  align-items: center;

  input {
    ${props => (props.hasIcon ? 'padding-right: 24px;' : 'padding: 0 24px;')}
    align-self: stretch;
    flex: 1;
    border-radius: 10px;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #757575;
    }
  }

  svg {
    margin: 0 16px;
    color: #757575;
  }
`;
