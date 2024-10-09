import { FC, ReactNode } from 'react';
import { TableContextProvider } from './context/SupplyQueueTableContext';
import { TableContextProvider as VariantTableContext } from './context/VariantTableConfigContext';

interface ProductsWithContextProps {
  children: ReactNode;
}

export const SupplyQueueWithContext: FC<ProductsWithContextProps> = ({ children }) => {
  return (
    <TableContextProvider>
      <VariantTableContext>{children}</VariantTableContext>
    </TableContextProvider>
  );
};
