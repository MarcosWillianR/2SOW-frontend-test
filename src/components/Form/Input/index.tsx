import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactInputMask, { Props } from 'react-input-mask';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends Props {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  customId?: string;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  name,
  customId,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    console.log(inputRef?.current);
    // setIsFilled(!!inputRef?.current?.value);
  }, []);

  return (
    <Container
      id={customId}
      isErrored={!!error}
      hasIcon={!!Icon}
      isFocused={isFocused}
      isFilled={isFilled}
      className="unform_input"
    >
      {Icon && <Icon size={20} />}

      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
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

export default Input;
