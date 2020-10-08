import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => (
  <Container hasIcon={!!Icon}>
    {Icon && <Icon size={20} />}
    <input name={name} {...rest} />
  </Container>
);

export default Input;
