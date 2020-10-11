import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import apiClient from '../../services/apiClient';

import Dashboard from '../../pages/Dashboard';

const apiMock = new MockAdapter(apiClient);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../hooks/Toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('Dashboard page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to list users', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    apiMock.onGet('usuarios').reply(200, [
      {
        nome: 'John Doe',
        email: 'john_doe@mail.com',
        cpf: '111.111.111-11',
        endereco: {
          rua: 'Rua Example Test',
          bairro: 'Example Test',
          numero: 1111,
          cidade: 'Test Example',
          cep: 11111111,
        },
        id: 1,
      },
    ]);

    await waitFor(() => {
      expect(getByTestId('list-item')).not.toBeEmpty();
    });

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john_doe@mail.com')).toBeTruthy();
    expect(getByText('111.111.111-11')).toBeTruthy();
    expect(getByText('Test Example')).toBeTruthy();
  });

  it('should display error when list users', async () => {
    render(<Dashboard />);

    apiMock.onGet('usuarios').reply(400);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should be able to delete user', async () => {
    const { getByTestId, queryByTestId } = render(<Dashboard />);

    apiMock.onGet('usuarios').reply(200, [
      {
        nome: 'John Doe',
        email: 'john_doe@mail.com',
        cpf: '111.111.111-11',
        endereco: {
          rua: 'Rua Example Test',
          bairro: 'Example Test',
          numero: 1111,
          cidade: 'Test Example',
          cep: 11111111,
        },
        id: 1,
      },
    ]);

    apiMock.onDelete('usuarios/1').reply(200);

    await waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('delete-item-button'));
      });
    });

    expect(queryByTestId('list-item')).toBeNull();
  });

  it('should display error when delete user', async () => {
    const { getByTestId } = render(<Dashboard />);

    apiMock.onGet('usuarios').reply(200, [
      {
        nome: 'John Doe',
        email: 'john_doe@mail.com',
        cpf: '111.111.111-11',
        endereco: {
          rua: 'Rua Example Test',
          bairro: 'Example Test',
          numero: 1111,
          cidade: 'Test Example',
          cep: 11111111,
        },
        id: 1,
      },
    ]);

    apiMock.onDelete('usuarios/1').reply(400);

    await waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('delete-item-button'));
      });
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should be able to search an user', async () => {
    const { getByTestId, getByText } = render(<Dashboard />);

    apiMock.onGet('usuarios').reply(200, [
      {
        nome: 'John Doe',
        email: 'john_doe@mail.com',
        cpf: '111.111.111-11',
        endereco: {
          rua: 'Rua Example Test',
          bairro: 'Example Test',
          numero: 1111,
          cidade: 'Test Example',
          cep: 11111111,
        },
        id: 1,
      },
    ]);

    apiMock.onGet('usuarios?q=John').reply(200, [
      {
        nome: 'John Doe',
        email: 'john_doe@mail.com',
        cpf: '111.111.111-11',
        endereco: {
          rua: 'Rua Example Test',
          bairro: 'Example Test',
          numero: 1111,
          cidade: 'Test Example',
          cep: 11111111,
        },
        id: 1,
      },
    ]);

    await waitFor(() => {
      act(() => {
        fireEvent.change(getByTestId('search-input'), {
          target: { value: 'John' },
        });
      });
    });

    await waitFor(() => {
      expect(getByTestId('list-item')).not.toBeEmpty();
    });

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john_doe@mail.com')).toBeTruthy();
    expect(getByText('111.111.111-11')).toBeTruthy();
    expect(getByText('Test Example')).toBeTruthy();
  });
});
