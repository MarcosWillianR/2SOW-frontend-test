import React from 'react';
import { FiLogOut, FiPlus, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';

import SearchInput from '../../components/SearchInput';
import {
  Container,
  UseListContainer,
  UserListContent,
  UserListColumnTitles,
  UserListItemContent,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

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

          <UserListItemContent>
            <span>Marcos Willian Almeida</span>
            <span>024.542.490.30</span>
            <span>markusuuuu@gmail.com</span>
            <span>Porto Alegre - RS</span>

            <button type="button">
              <FiEdit3 size={24} />
            </button>
            <button type="button">
              <FiTrash2 size={24} />
            </button>
          </UserListItemContent>
        </UserListContent>
      </UseListContainer>
    </Container>
  );
};

export default Dashboard;
