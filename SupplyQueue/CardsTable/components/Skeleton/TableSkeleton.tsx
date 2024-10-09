import { FC } from 'react';
import { Skeleton } from '@mui/material';

interface TableSkeletonProps {
  width: number;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ width }) => {
  return (
    <>
      <Skeleton variant='circular' width={width} height={53} style={{ borderRadius: 16 }} />
    </>
  );
};
