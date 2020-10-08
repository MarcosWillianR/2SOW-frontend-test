import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import signInImage from '../../assets/signin-image.jpg';

import { Container, Form } from './styles';

import { Input, Button } from '../../components/Form';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);

  const handleSubmit = useCallback((data: Record<string, undefined>) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <div>
        <img src={signInImage} alt=" - Login" />
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input name="password" icon={FiLock} placeholder="Senha" />

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
