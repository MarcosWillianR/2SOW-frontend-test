import React from 'react';

import { Container, FormContent } from './styles';

import { Input } from '../../components/Form';

import signInImage from '../../assets/signin-image.jpg';

const SignIn: React.FC = () => (
  <Container>
    <div>
      <img src={signInImage} alt=" - Login" />
    </div>

    <FormContent>
      <h1>Login</h1>

      <Input name="email" placeholder="E-mail" />
      <Input name="password" placeholder="Senha" />

      <button type="button">Entrar</button>
    </FormContent>
  </Container>
);

export default SignIn;
