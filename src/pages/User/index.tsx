import React, { useCallback, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FiLogOut, FiChevronLeft, FiMail, FiUser } from 'react-icons/fi';

import { useHistory, Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import apiClient from '../../services/apiClient';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import { Input, Button, MaskInput, CepInput } from '../../components/Form';
import { CepData } from '../../components/Form/CepInput';

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
  const { addToast } = useToast();
  const { goBack } = useHistory();

  const [cepError, setCepError] = useState('');
  const [currentCep, setCurrentCep] = useState('');
  const [cepLoading, setCepLoading] = useState(false);

  const formRef = useRef<FormHandles | null>(null);

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        setCepError('');
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          nome: Yup.string().required('Nome obrigatório'),
          endereco: Yup.object().shape({
            bairro: Yup.string().required('Bairro obrigatório'),
            cidade: Yup.string().required('Cidade obrigatória'),
            numero: Yup.string().required('Número obrigatório'),
            rua: Yup.string().required('Rua obrigatória'),
          }),
        });

        await schema.validate(data, { abortEarly: false });
        if (currentCep.length < 1) throw Error();

        const formattedData = {
          ...data,
          endereco: {
            ...data.endereco,
            cep: Number(currentCep),
            numero: Number(data.endereco.numero),
          },
        };

        await apiClient.post('usuarios', formattedData);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso.',
        });

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar novo usuário.',
            description:
              'Ocorreu um erro ao tentar cadastrar, tente novamente.',
          });
        }

        if (currentCep.length === 0) {
          setCepError('CEP obrigatório');
        }

        if (currentCep.length > 0 && currentCep.length < 8) {
          setCepError('CEP inválido');
        }
      }
    },
    [currentCep, addToast, goBack],
  );

  const handleCepChange = useCallback((cep: string) => {
    setCurrentCep(cep);
  }, []);

  const handleCepLoading = useCallback(cepIsLoading => {
    setCepLoading(cepIsLoading);
  }, []);

  const handleCepResponse = useCallback(({ rua, bairro, cidade }: CepData) => {
    formRef.current?.setFieldValue('endereco.rua', rua);
    formRef.current?.setFieldValue('endereco.bairro', bairro);
    formRef.current?.setFieldValue('endereco.cidade', cidade);

    if (rua && bairro && cidade) {
      formRef.current?.getFieldRef('endereco.numero').focus();
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
          <CepInput
            cepResponse={handleCepResponse}
            getCepCurrentValue={handleCepChange}
            loading={handleCepLoading}
            error={cepError}
            mask="99999-999"
          />
        </FormWrapper>

        {cepLoading ? (
          <Skeleton height={49} style={{ marginTop: 30 }} />
        ) : (
          <Input name="endereco.rua" placeholder="Rua" />
        )}

        <FormWrapper>
          {cepLoading ? (
            <Skeleton width={220.56} height={49} />
          ) : (
            <Input
              customId="input_bairro"
              name="endereco.bairro"
              placeholder="Bairro"
            />
          )}
          <Input
            customId="input_numero"
            name="endereco.numero"
            placeholder="Número"
          />
        </FormWrapper>

        {cepLoading ? (
          <Skeleton height={49} style={{ marginTop: 30 }} />
        ) : (
          <Input
            customId="input_cidade"
            name="endereco.cidade"
            placeholder="Cidade"
          />
        )}

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default User;
