import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import FullScreenLoader from './FullScreenLoader';

const GlobalLoader: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const active = (isFetching ?? 0) + (isMutating ?? 0) > 0;

  if (!active) return null;

  return <FullScreenLoader />;
};

export default GlobalLoader;