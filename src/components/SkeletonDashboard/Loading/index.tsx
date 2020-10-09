import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Container } from './styles';

const Loading: React.FC = () => (
  <Container>
    <span>
      <Skeleton height={18} />
    </span>
    <span>
      <Skeleton height={18} />
    </span>
    <span>
      <Skeleton height={18} />
    </span>
    <span>
      <Skeleton height={18} />
    </span>

    <button type="button">
      <Skeleton height={18} />
    </button>
    <button type="button">
      <Skeleton height={18} />
    </button>
  </Container>
);

export default Loading;
