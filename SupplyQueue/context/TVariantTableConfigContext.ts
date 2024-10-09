import { createContext, Dispatch, SetStateAction } from 'react';
import { VariantTableConfigType } from '../types';

export type SupplyQueueTableCtx = {
  showVariantTableColumnsArray: { id: number; index: number }[];
  setShowVariantTableColumnsArray: Dispatch<SetStateAction<{ id: number; index: number }[]>>;
  sortedVariantTableConfig: VariantTableConfigType[];
  sortedInitialVariantTableConfig: VariantTableConfigType[];
  setInitialSortedVariantTableConfig: Dispatch<SetStateAction<VariantTableConfigType[]>>;
  setSortedVariantTableConfig: Dispatch<SetStateAction<VariantTableConfigType[]>>;
  totalWidth: number;
  setVariantPage: Dispatch<SetStateAction<number>>;
  variantPage: number;
};

export const SupplyQueueVariantTableDefaultConfigValueCtx = createContext<SupplyQueueTableCtx>({
  setShowVariantTableColumnsArray: () => {},
  showVariantTableColumnsArray: [],
  sortedVariantTableConfig: [],
  sortedInitialVariantTableConfig: [],
  setInitialSortedVariantTableConfig: () => {},
  setSortedVariantTableConfig: () => {},
  totalWidth: 0,
  setVariantPage: () => {},
  variantPage: 0,
});

export const SupplyQueueVariantTableConfigCtx = SupplyQueueVariantTableDefaultConfigValueCtx.Provider;
