import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Loading from './Loading';

interface SkeletonDashboardProps {
  quantity?: number;
}

const SkeletonDashboard: React.FC<SkeletonDashboardProps> = ({ quantity }) => {
  const loadingArray = Array.from({ length: quantity || 1 });

  return (
    <>
      {loadingArray.map(() => (
        <Loading key={uuidv4()} />
      ))}
    </>
  );
};

export default SkeletonDashboard;
