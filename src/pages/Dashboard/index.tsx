import React, { useState, useEffect } from 'react';
import { FiLogOut, FiPlus, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import apiClient from '../../services/apiClient';

import SearchInput from '../../components/SearchInput';
import SkeletonDashboard from '../../components/SkeletonDashboard';

import {
  Container,
  UseListContainer,
  UserListContent,
  UserListColumnTitles,
  UserListItemContent,
} from './styles';

interface User {
  nome: string;
  cpf: string;
  email: string;
  cidade: string;
}

interface UserRequest {
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cidade: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);

    apiClient
      .get<UserRequest[]>('usuarios')
      .then(response => {
        const usersFormatted = response.data.map(
          ({ nome, cpf, email, endereco }) => ({
            nome,
            cpf,
            email,
            cidade: endereco.cidade,
          }),
        );

        setUsers(usersFormatted);
      })
      .catch(() =>
        addToast({
          title: 'Erro ao buscar usuários',
          description: 'Aconteceu um erro ao buscar usuários, tente novamente.',
          type: 'error',
        }))
      .finally(() => setIsLoadingUsers(false));
  }, [addToast]);

  return (
    <Container>
      <header>
        <div>
          <h1>MY USERS</h1>

          <button type="button" onClick={signOut}>
            <FiLogOut size={24} />
          </button>
        </div>
      </header>

      <UseListContainer>
        <header>
          <div>
            <h2>Usuários</h2>
            <span>todos os cadastrados no sistema</span>
          </div>

          <div>
            <button type="button">
              <FiPlus size={24} />
            </button>

            <SearchInput />
          </div>
        </header>

        <UserListContent>
          <UserListColumnTitles>
            <strong>Nome</strong>
            <strong>CPF</strong>
            <strong>E-mail</strong>
            <strong>Cidade</strong>
          </UserListColumnTitles>

          {isLoadingUsers && <SkeletonDashboard quantity={4} />}

          {users.length !== 0 &&
            users.map(user => (
              <UserListItemContent key={user.cpf}>
                <span>{user.nome}</span>
                <span>{user.cpf}</span>
                <span>{user.email}</span>
                <span>{user.cidade}</span>

                <button type="button">
                  <FiEdit3 size={24} />
                </button>
                <button type="button">
                  <FiTrash2 size={24} />
                </button>
              </UserListItemContent>
            ))}
        </UserListContent>
      </UseListContainer>
    </Container>
  );
};

export default Dashboard;
