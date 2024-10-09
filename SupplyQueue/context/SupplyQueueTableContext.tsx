import { ChangeEvent, FC, ReactNode, useLayoutEffect, useMemo, useState } from 'react';
import { Option } from 'app/utils/interfaces';
import debounce from '@mui/utils/debounce';
import { initialTableConfig } from '../CardsTable/tableConfig';
import { SupplyQueueTableCtx } from './TSupplyQueueTableContext';
import { sortedTableConfig } from '../CardsTable/utils/sortedTableConfig';
import { getAndDecryptTableConfig } from '../CardsTable/utils/getAndDecryptTableConfig';
import { TableConfigType } from '../types';
import { Option as ColorsOption } from 'app/components/ui/Select/Select';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useTranslations } from 'next-intl';

type TableContextProviderProps = {
  children?: ReactNode;
};
export const supplyQueueRowsCountOptions = [
  { code: '10', name: '10' },
  { code: '20', name: '20' },
  { code: '50', name: '50' },
  { code: '100', name: '100' },
];

export interface StockUnitResponseWithProductId extends StockUnitResponse {
  productId: Maybe<string> | undefined;
}

export type ShowTableColumnsArray = { id: number; index: number };
export const TableContextProvider: FC<TableContextProviderProps> = ({ children }) => {
  const tCommon = useTranslations('common');
  const tMain = useTranslations('main');
  const tTables = useTranslations('tableColumnNames');

  const [showTableColumnsArray, setShowTableColumnsArray] = useState<ShowTableColumnsArray[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [colorSearch, setColorSearch] = useState<ColorsOption[] | null>(null);
  const [categorySearch, setCategorySearch] = useState<Option[] | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  const [page, setPage] = useState<number>(0);
  const [rowsCount, setRowsCount] = useState<Option>({ code: '10', name: '10' });
  const [width, setWidth] = useState<number>(0);

  const [tableConfig, setTableConfig] = useState<TableConfigType[]>(() =>
    initialTableConfig({
      tCommon,
      tMain,
      tTables,
    }),
  );
  const [initialConfig, setInitialConfig] = useState<TableConfigType[]>(() =>
    initialTableConfig({
      tCommon,
      tMain,
      tTables,
    }),
  );
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const setDebouncedSearchText = useMemo(() => {
    return debounce((text: string) => setSearchValue(text), 800);
  }, []);
  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchText(e.currentTarget.value);
  };

  const updateTableConfig = (
    prevConfig: TableConfigType[],
    showColumnsArray: {
      id: number;
      index: number;
    }[],
  ): TableConfigType[] => {
    return prevConfig.map(column => ({
      ...column,
      showColumn: column.id === 10 || column.id === 1 ? true : showColumnsArray.some(item => item.id === column.id),
    }));
  };
  useLayoutEffect(() => {
    const rowsCount = localStorage.getItem('supplyQueueRowsCount');
    if (rowsCount) setRowsCount({ code: JSON.parse(rowsCount), name: JSON.parse(rowsCount) });
  }, []);
  const setRowsCountHandler = (newValue: Option) => {
    localStorage.setItem('supplyQueueRowsCount', JSON.stringify(newValue.code));
    setRowsCount(newValue);
  };
  useLayoutEffect(() => {
    if (showTableColumnsArray.length === 0) return;
    setTableConfig(prevState => updateTableConfig(prevState, showTableColumnsArray));
  }, [showTableColumnsArray]);

  const calculateTotalWidth = useMemo(
    () => (tableConfig: TableConfigType[]) => {
      return tableConfig.reduce((totalWidth, column) => {
        if (column.showColumn) {
          totalWidth += parseInt(column.width.replace('px', ''), 10);
        }
        return totalWidth;
      }, 0);
    },
    [],
  );
  const totalWidth = useMemo(() => {
    return calculateTotalWidth(tableConfig);
  }, [calculateTotalWidth, tableConfig]);

  useLayoutEffect(() => {
    const configs = getAndDecryptTableConfig<ShowTableColumnsArray, TableConfigType>({
      setShowTableColumnsArray,
      tableConfigKey: 'supplyQueueColumnConfig',
      columnsConfigKey: 'showSupplyQueueColumn',
      initialTableConfig: initialTableConfig({
        tCommon,
        tMain,
        tTables,
      }),
    });
    if (configs) {
      const { parsedShowColumns, parsedShowTableConfig } = configs;
      const sortedShowColumns = parsedShowColumns.sort(
        (a: ShowTableColumnsArray, b: ShowTableColumnsArray) => a.index - b.index,
      );
      setShowTableColumnsArray(sortedShowColumns);
      sortedTableConfig<TableConfigType, ShowTableColumnsArray>({
        setTableConfig,
        parsedShowTableConfig,
        sortedShowColumns,
        setInitialConfig,
      });
    }
  }, []);

  return (
    <SupplyQueueTableCtx
      value={{
        showTableColumnsArray,
        setShowTableColumnsArray,
        tableConfig,
        setTableConfig,
        initialConfig,
        setInitialConfig,
        totalWidth,
        setIsHeaderHidden,
        isHeaderHidden,
        page,
        setPage,
        rowsCount,
        setRowsCount: setRowsCountHandler,
        setSearchValue: changeSearchValue,
        searchValue: searchValue === '' ? null : searchValue,
        colorSearch,
        setColorSearch,
        categorySearch,
        setCategorySearch,
        setWidth,
        width,
        inputValues,
        setInputValues,
      }}>
      {children}
    </SupplyQueueTableCtx>
  );
};
