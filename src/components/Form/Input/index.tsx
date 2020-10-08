import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => (
  <Container>
    <input name={name} {...rest} />
  </Container>
);

export default Input;
