import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';

import signInImage from '../../assets/signin-image.jpg';

import { Input, Button } from '../../components/Form';

import { Container, Form } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);
  const { signIn } = useAuth();
  const { push } = useHistory();

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(4, 'No mínimo 4 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        setSubmitLoading(true);

        const { email, password } = data;

        signIn({ email, password });

        push('/dashboard');
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } finally {
        setSubmitLoading(false);
      }
    },
    [signIn, push],
  );

  return (
    <Container>
      <div>
        <img src={signInImage} alt=" MyUsers - Login" />
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

        <Button loading={submitLoading} type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
