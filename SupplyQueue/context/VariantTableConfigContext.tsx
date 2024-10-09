import { FC, ReactNode, useLayoutEffect, useMemo, useState } from 'react';
import { VariantTableConfigType } from '../types';
import { variantTableConfig } from '../CardsTable/components/VariantTable/variantTableConfig';
import { SupplyQueueVariantTableConfigCtx } from './TVariantTableConfigContext';
import { sortedTableConfig } from '../CardsTable/utils/sortedTableConfig';
import { getAndDecryptTableConfig } from '../CardsTable/utils/getAndDecryptTableConfig';
import { useTranslations } from 'next-intl';

type TableContextProviderProps = {
  children?: ReactNode;
};
export type ShowVariantTableColumnsArray = { id: number; index: number };

export const TableContextProvider: FC<TableContextProviderProps> = ({ children }) => {
  const tCommon = useTranslations('common');
  const tMain = useTranslations('main');
  const tTables = useTranslations('tableColumnNames');

  const [variantPage, setVariantPage] = useState(0);
  const [showVariantTableColumnsArray, setShowVariantTableColumnsArray] = useState<ShowVariantTableColumnsArray[]>([]);
  const [sortedVariantTableConfig, setSortedVariantTableConfig] = useState<VariantTableConfigType[]>(() =>
    variantTableConfig({
      tCommon,
      tMain,
      tTables,
    }),
  );
  const [sortedInitialVariantTableConfig, setInitialSortedVariantTableConfig] = useState<VariantTableConfigType[]>(() =>
    variantTableConfig({
      tCommon,
      tMain,
      tTables,
    }),
  );
  const updateTableConfig = (
    prevConfig: VariantTableConfigType[],
    showColumnsArray: {
      id: number;
      index: number;
    }[],
  ): VariantTableConfigType[] => {
    return prevConfig.map(column => ({
      ...column,
      showColumn: column.id === 10 || column.id === 1 ? true : showColumnsArray.some(item => item.id === column.id),
    }));
  };
  useLayoutEffect(() => {
    if (showVariantTableColumnsArray.length === 0) return;
    setSortedVariantTableConfig(prevState => updateTableConfig(prevState, showVariantTableColumnsArray));
  }, [showVariantTableColumnsArray]);
  useLayoutEffect(() => {
    const configs = getAndDecryptTableConfig<ShowVariantTableColumnsArray, VariantTableConfigType>({
      setShowTableColumnsArray: setShowVariantTableColumnsArray,
      tableConfigKey: 'supplyQueueVariantColumnConfig',
      columnsConfigKey: 'showVariantSupplyQueueColumn',
      initialTableConfig: variantTableConfig({
        tCommon,
        tMain,
        tTables,
      }),
    });
    if (configs) {
      const { parsedShowTableConfig, parsedShowColumns } = configs;
      const sortedShowColumns = parsedShowColumns.sort(
        (a: ShowVariantTableColumnsArray, b: ShowVariantTableColumnsArray) => a.index - b.index,
      );
      setShowVariantTableColumnsArray(sortedShowColumns);
      sortedTableConfig<VariantTableConfigType, ShowVariantTableColumnsArray>({
        setTableConfig: setSortedVariantTableConfig,
        setInitialConfig: setInitialSortedVariantTableConfig,
        parsedShowTableConfig,
        sortedShowColumns,
      });
    }
  }, []);

  const calculateTotalWidth = useMemo(
    () => (tableConfig: VariantTableConfigType[]) => {
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
    return calculateTotalWidth(sortedVariantTableConfig);
  }, [calculateTotalWidth, sortedVariantTableConfig]);
  return (
    <SupplyQueueVariantTableConfigCtx
      value={{
        showVariantTableColumnsArray,
        setShowVariantTableColumnsArray,
        sortedVariantTableConfig,
        sortedInitialVariantTableConfig,
        setInitialSortedVariantTableConfig,
        setSortedVariantTableConfig,
        totalWidth,
        setVariantPage,
        variantPage,
      }}>
      {children}
    </SupplyQueueVariantTableConfigCtx>
  );
};
