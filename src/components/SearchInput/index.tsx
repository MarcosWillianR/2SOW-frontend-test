import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import { debounce } from '../../utils';

import { useToast } from '../../hooks/Toast';

import { User, UserRequest } from '../../pages/Dashboard';

import apiClient from '../../services/apiClient';

import { Container } from './styles';

interface SearchInputProps {
  loading(isLoading: boolean): void;
  handleUpdateUsers(users: User[]): void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  loading,
  handleUpdateUsers,
}) => {
  const { addToast } = useToast();

  const handleSearchUser = useCallback(
    async (name: string) => {
      try {
        loading(true);

        const response = await apiClient.get<UserRequest[]>('usuarios', {
          params: { q: name },
        });

        const usersFormatted = response.data.map(
          ({ id, nome, cpf, email, endereco }) => ({
            id,
            nome,
            cpf,
            email,
            cidade: endereco.cidade,
          }),
        );

        handleUpdateUsers(usersFormatted);
      } catch {
        addToast({
          title: 'Erro ao buscar usuário',
          description:
            'Ocorreu um erro ao buscar pelo usuário, tente novamente.',
          type: 'error',
        });
      } finally {
        loading(false);
      }
    },
    [addToast, handleUpdateUsers, loading],
  );

  const handleChangeInput = useCallback(
    ({ target }) => {
      loading(true);

      debounce({
        callback: () => {
          handleSearchUser(target.value);
        },
        delay: 500,
      });
    },
    [loading, handleSearchUser],
  );

  return (
    <Container className="search-input">
      <input
        type="text"
        placeholder="Buscar pelo nome"
        onChange={handleChangeInput}
      />

      <FiSearch size={24} color="#547EFF" />
    </Container>
  );
};

export default SearchInput;
