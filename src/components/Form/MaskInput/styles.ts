import styled from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  hasIcon: boolean;
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 22px;
  background: #f3f2f2;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 2px solid #f3f2f2;
  ${props => props.isErrored && 'border-color: #c53030;'}
  ${props => props.isFocused && 'border-color: #547eff;'}
  min-width: 350px;
  width: 100%;
  height: 50px;
  color: #222;
  display: flex;
  align-items: center;
  transition: all 0.5s ease;

  input {
    ${props => !props.hasIcon && 'padding: 0 24px;'}
    align-self: stretch;
    flex: 1;
    width: 100%;
    border-radius: 10px;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #757575;
    }
  }

  svg {
    margin: 0 16px;
    color: ${props => (props.isFocused ? '#547eff' : '#757575')};
  }
`;

export const Error = styled(Tooltip)`
  display: flex;
  align-items: center;

  span {
    background: #c53030;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
