import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import signInImage from '../../assets/signin-image.jpg';

import { Container, FormContent } from './styles';

import { Input, Button } from '../../components/Form';

const SignIn: React.FC = () => (
  <Container>
    <div>
      <img src={signInImage} alt=" - Login" />
    </div>

    <FormContent>
      <h1>Login</h1>

      <Input name="email" icon={FiMail} placeholder="E-mail" />
      <Input name="password" icon={FiLock} placeholder="Senha" />

      <Button type="submit">Entrar</Button>
    </FormContent>
  </Container>
);

export default SignIn;
