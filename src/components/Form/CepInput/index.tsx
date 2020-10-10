import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import axios from 'axios';

import { debounce } from '../../../utils';

import { useToast } from '../../../hooks/Toast';

import { Container, Error } from './styles';

export interface CepData {
  rua: string;
  bairro: string;
  cidade: string;
}

interface CepResponse {
  bairro: string;
  localidade: string;
  logradouro: string;
  erro?: boolean;
}

interface CepInputProps extends InputProps {
  customId?: string;
  error?: string;
  defaultValue?: string;
  getCepCurrentValue(cep: string): void;
  loading(isLoading: boolean): void;
  cepResponse(cepData: CepData): void;
}

const CepInput: React.FC<CepInputProps> = ({
  customId,
  defaultValue = '',
  getCepCurrentValue,
  cepResponse,
  loading,
  error = '',
  ...rest
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [cepData, setCepData] = useState<CepData>({} as CepData);
  const [cepValue, setCepValue] = useState('');

  const { addToast } = useToast();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    cepResponse(cepData);
  }, [cepResponse, cepData]);

  useEffect(() => {
    if (defaultValue.length === 8) {
      setCepValue(defaultValue);
    }
  }, [defaultValue]);

  const handleGetCepAddress = useCallback(
    async (cep: string) => {
      try {
        const { data } = await axios.get<CepResponse>(
          `https://viacep.com.br/ws/${cep}/json/`,
        );

        if (data.erro) {
          return addToast({
            title: 'CEP inválido',
            type: 'error',
          });
        }

        const { bairro, localidade: cidade, logradouro: rua } = data;

        loading(false);
        setCepData({ bairro, cidade, rua });
      } catch {
        addToast({
          title: 'Erro ao buscar CEP',
          description:
            'Ocorreu um erro ao tentar buscar pelo cep, tente novamente.',
          type: 'error',
        });
      } finally {
        loading(false);
      }
    },
    [addToast, loading],
  );

  const handleCepChange = useCallback(
    async ({ target }) => {
      setCepValue(target.value);
      const clearedCEP = target.value.replace(/_|-/g, '');

      getCepCurrentValue(clearedCEP);

      if (clearedCEP.length === 0) {
        cepResponse({ bairro: '', cidade: '', rua: '' });
      }

      if (clearedCEP.length === 8) {
        loading(true);

        debounce({
          callback: async () => {
            await handleGetCepAddress(clearedCEP);
          },
          delay: 500,
        });
      }
    },
    [loading, getCepCurrentValue, handleGetCepAddress, cepResponse],
  );

  return (
    <Container
      id={customId}
      isErrored={!!error}
      isFocused={isFocused}
      className="unform_input"
    >
      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        placeholder="CEP"
        onChange={handleCepChange}
        value={cepValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default CepInput;
