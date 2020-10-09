import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

const SearchInput: React.FC = () => (
  <Container className="search-input">
    <input type="text" placeholder="Buscar pelo nome" />

    <FiSearch size={24} color="#547EFF" />
  </Container>
);

export default SearchInput;
