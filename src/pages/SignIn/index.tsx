import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import signInImage from '../../assets/signin-image.jpg';

import { Input, Button } from '../../components/Form';

import { Container, Form } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(4, 'No mínimo 4 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <div>
        <img src={signInImage} alt=" - Login" />
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
