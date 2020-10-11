import React, { useCallback, useRef, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  FiLogOut,
  FiChevronLeft,
  FiMail,
  FiUser,
  FiMapPin,
} from 'react-icons/fi';

import { useHistory, Link, useParams } from 'react-router-dom';

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

interface UserParam {
  id?: string;
}

const User: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const { goBack } = useHistory();
  const userParams: UserParam = useParams();

  const isEditPage = !!userParams.id;

  const [cepError, setCepError] = useState('');
  const [currentCep, setCurrentCep] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepDefaultValue, setCepDefaultValue] = useState('');

  const [submitLoading, setSubmitLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [user, setUser] = useState({} as UserFormData);

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

        setSubmitLoading(true);

        const formattedData = {
          ...data,
          endereco: {
            ...data.endereco,
            cep: Number(currentCep),
            numero: Number(data.endereco.numero),
          },
        };

        if (isEditPage) {
          await apiClient.put(`usuarios/${userParams.id}`, formattedData);

          addToast({
            type: 'success',
            title: 'Usuário editado com sucesso.',
          });
        } else {
          await apiClient.post('usuarios', formattedData);

          addToast({
            type: 'success',
            title: 'Usuário cadastrado com sucesso.',
          });
        }
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
      } finally {
        setSubmitLoading(false);
      }
    },
    [currentCep, addToast, goBack, isEditPage, userParams.id],
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

  useEffect(() => {
    if (userParams.id) {
      setIsLoadingForm(true);

      apiClient
        .get<UserFormData>(`usuarios/${userParams.id}`)
        .then(response => {
          setIsLoadingForm(false);

          setUser({
            ...response.data,
            cpf: String(response.data.cpf),
          });

          setCepDefaultValue(String(response.data.endereco.cep));
          setCurrentCep(String(response.data.endereco.cep));
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao buscar usuário.',
            description:
              'Ocorreu um erro ao tentar encontrar esse usuário, tente novamente.',
          });
        })
        .finally(() => {
          setIsLoadingForm(false);
        });
    }
  }, [userParams.id, addToast]);

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
          <h1>{isEditPage ? 'Editar usuário' : 'Cadastrar novo usuário'}</h1>
          <p>
            preencha os campos abaixo para
            {isEditPage ? ' editar o usuário' : ' cadastrar um novo usuário'}
          </p>
        </FormTitle>

        {isLoadingForm ? (
          <Skeleton height={49} />
        ) : (
          <Input
            name="nome"
            defaultValue={user?.nome}
            icon={FiUser}
            placeholder="Nome"
          />
        )}

        {isLoadingForm ? (
          <Skeleton height={49} style={{ marginTop: 30 }} />
        ) : (
          <Input
            defaultValue={user?.email}
            name="email"
            icon={FiMail}
            placeholder="E-mail"
          />
        )}

        <FormWrapper>
          {isLoadingForm ? (
            <Skeleton width={186} height={49} />
          ) : (
            <MaskInput
              defaultValue={user?.cpf}
              mask=""
              name="cpf"
              placeholder="CPF"
            />
          )}

          {isLoadingForm ? (
            <Skeleton width={186} height={49} />
          ) : (
            <CepInput
              defaultValue={cepDefaultValue}
              cepResponse={handleCepResponse}
              getCepCurrentValue={handleCepChange}
              loading={handleCepLoading}
              error={cepError}
              mask="99999-999"
            />
          )}
        </FormWrapper>

        {cepLoading || isLoadingForm ? (
          <Skeleton height={49} style={{ marginTop: 30 }} />
        ) : (
          <Input
            defaultValue={user?.endereco?.rua}
            name="endereco.rua"
            icon={FiMapPin}
            placeholder="Rua"
          />
        )}

        <FormWrapper>
          {cepLoading || isLoadingForm ? (
            <Skeleton width={220.56} height={49} />
          ) : (
            <Input
              icon={FiMapPin}
              customId="input_bairro"
              name="endereco.bairro"
              defaultValue={user?.endereco?.bairro}
              placeholder="Bairro"
            />
          )}

          {isLoadingForm ? (
            <Skeleton width={140.45} height={49} />
          ) : (
            <Input
              customId="input_numero"
              name="endereco.numero"
              defaultValue={user?.endereco?.numero}
              placeholder="Número"
            />
          )}
        </FormWrapper>

        {cepLoading || isLoadingForm ? (
          <Skeleton height={49} style={{ marginTop: 30 }} />
        ) : (
          <Input
            icon={FiMapPin}
            customId="input_cidade"
            name="endereco.cidade"
            defaultValue={user?.endereco?.cidade}
            placeholder="Cidade"
          />
        )}

        <Button loading={submitLoading} type="submit">
          {isEditPage ? 'Editar' : 'Cadastrar'}
        </Button>
      </Form>
    </Container>
  );
};

export default User;
