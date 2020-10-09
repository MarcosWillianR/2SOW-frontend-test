import React, { useState, useEffect, useCallback } from 'react';
import { FiLogOut, FiPlus, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  cidade: string;
}

export interface UserRequest {
  id: string;
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
          ({ id, nome, cpf, email, endereco }) => ({
            id,
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
        }),
      )
      .finally(() => setIsLoadingUsers(false));
  }, [addToast]);

  const handleDeleteUser = useCallback(
    async (user_id: string) => {
      try {
        setIsLoadingUsers(true);
        await apiClient.delete(`usuarios/${user_id}`);
      } catch {
        addToast({
          title: 'Erro ao deletar usuário',
          description:
            'Aconteceu um erro ao tentar deletar o usuário, tente novamente.',
          type: 'error',
        });
      } finally {
        setIsLoadingUsers(false);
        setUsers(state => state.filter(user => user.id !== user_id));
      }
    },
    [addToast],
  );

  const handleSearchLoading = useCallback((isLoading: boolean) => {
    setIsLoadingUsers(isLoading);
  }, []);

  const handleUpdateUsers = useCallback((updatedUsers: User[]) => {
    setUsers(updatedUsers);
  }, []);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">MY USERS</Link>

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
            <Link to="/user">
              <FiPlus size={24} />
            </Link>

            <SearchInput
              loading={isLoading => handleSearchLoading(isLoading)}
              handleUpdateUsers={handleUpdateUsers}
            />
          </div>
        </header>

        <UserListContent>
          <UserListColumnTitles>
            <strong>Nome</strong>
            <strong>CPF</strong>
            <strong>E-mail</strong>
            <strong>Cidade</strong>
          </UserListColumnTitles>

          {isLoadingUsers && <SkeletonDashboard quantity={users.length} />}

          {!isLoadingUsers &&
            users.length !== 0 &&
            users.map(user => (
              <UserListItemContent key={user.id}>
                <span>{user.nome}</span>
                <span>{user.cpf}</span>
                <span>{user.email}</span>
                <span>{user.cidade}</span>

                <button type="button">
                  <FiEdit3 size={24} />
                </button>
                <button type="button" onClick={() => handleDeleteUser(user.id)}>
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
