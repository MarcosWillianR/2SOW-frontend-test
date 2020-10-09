import React, { useCallback, useRef } from 'react';
import {
  FiLogOut,
  FiChevronLeft,
  FiMail,
  FiUser,
  FiMapPin,
} from 'react-icons/fi';

import { useHistory, Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';

import { Input, Button, MaskInput } from '../../components/Form';

import { Container, Form, FormTitle, FormWrapper } from './styles';

interface UserFormData {
  cpf: string;
  email: string;
  nome: string;
  endereco: {
    bairro: string;
    cep: string;
    cidade: string;
    numero: string;
    rua: string;
  };
}

const User: React.FC = () => {
  const { signOut } = useAuth();
  const { goBack } = useHistory();

  const formRef = useRef<FormHandles | null>(null);

  const handleSubmit = useCallback(async (data: UserFormData) => {
    try {
      console.log(data);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required('CPF obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        nome: Yup.string().required('Nome obrigatório'),
        endereco: Yup.object().shape({
          bairro: Yup.string().required('Bairro obrigatório'),
          cep: Yup.string().required('CEP obrigatório'),
          cidade: Yup.string().required('Cidade obrigatória'),
          numero: Yup.string().required('Número obrigatório'),
          rua: Yup.string().required('Rua obrigatória'),
        }),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <header>
        <div>
          <button type="button" onClick={() => goBack()}>
            <FiChevronLeft size={24} />
          </button>

          <Link to="/dashboard">MY USERS</Link>

          <button type="button" onClick={signOut}>
            <FiLogOut size={24} />
          </button>
        </div>
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormTitle>
          <h1>Cadastrar novo usuário</h1>
          <p>preencha os campos abaixo para cadastrar um novo usuário</p>
        </FormTitle>

        <Input name="nome" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <FormWrapper>
          <MaskInput mask="999.999.999-99" name="cpf" placeholder="CPF" />
          <MaskInput mask="99999-999" name="endereco.cep" placeholder="CEP" />
        </FormWrapper>

        <Input name="endereco.rua" icon={FiMapPin} placeholder="Rua" />

        <FormWrapper>
          <Input
            customId="input_bairro"
            name="endereco.bairro"
            icon={FiMapPin}
            placeholder="Bairro"
          />
          <Input
            customId="input_numero"
            name="endereco.numero"
            placeholder="Número"
          />
        </FormWrapper>

        <Input
          customId="input_cidade"
          name="endereco.cidade"
          icon={FiMapPin}
          placeholder="Cidade"
        />

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default User;
