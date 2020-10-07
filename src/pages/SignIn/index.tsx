import React from 'react';

import { Container, FormContent } from './styles';

import signInImage from '../../assets/signin-image.jpg';

const SignIn: React.FC = () => (
  <Container>
    <div>
      <img src={signInImage} alt=" - Login" />
    </div>

    <FormContent>
      <h1>Login</h1>

      <input placeholder="E-mail" />
      <input placeholder="Senha" />

      <button type="button">Entrar</button>
    </FormContent>
  </Container>
);

export default SignIn;
