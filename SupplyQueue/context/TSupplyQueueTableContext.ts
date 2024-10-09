import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react';
import { Option } from 'app/utils/interfaces';
import { TableConfigType } from '../types';
import { Option as ColorsOption } from 'app/components/ui/Select/Select';

export type SupplyQueueTableCtx = {
  showTableColumnsArray: { id: number; index: number }[];
  setShowTableColumnsArray: Dispatch<SetStateAction<{ id: number; index: number }[]>>;
  tableConfig: TableConfigType[];
  setTableConfig: Dispatch<SetStateAction<TableConfigType[]>>;
  initialConfig: TableConfigType[];
  setInitialConfig: Dispatch<SetStateAction<TableConfigType[]>>;
  totalWidth: number;
  setIsHeaderHidden: Dispatch<SetStateAction<boolean>>;
  isHeaderHidden: boolean;
  page: number;
  rowsCount: Option;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsCount: Dispatch<SetStateAction<Option>>;
  setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string | null;
  colorSearch: ColorsOption[] | null;
  setColorSearch: (newValue: ColorsOption[]) => void;
  categorySearch: Option[] | null;
  setCategorySearch: (newValue: Option[]) => void;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  inputValues: { [key: number]: string };
  setInputValues: Dispatch<SetStateAction<{ [key: number]: string }>>;
};

export const SupplyQueueTableDefaultValueCtx = createContext<SupplyQueueTableCtx>({
  showTableColumnsArray: [],
  setShowTableColumnsArray: () => {},
  tableConfig: [],
  setTableConfig: () => {},
  initialConfig: [],
  setInitialConfig: () => {},
  totalWidth: 0,
  isHeaderHidden: false,
  setIsHeaderHidden: () => {},
  page: 0,
  setPage: () => {},
  rowsCount: { name: '10', code: '10' },
  setRowsCount: () => {},
  searchValue: null,
  setSearchValue: () => {},
  colorSearch: null,
  setColorSearch: () => {},
  categorySearch: null,
  setCategorySearch: () => {},
  width: 0,
  setWidth: () => {},
  inputValues: {},
  setInputValues: () => {},
});

export const SupplyQueueTableCtx = SupplyQueueTableDefaultValueCtx.Provider;
