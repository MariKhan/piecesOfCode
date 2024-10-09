import { useContext, useState } from 'react';
import { useTypedSelector } from 'app/hooks/redux';
import { SupplyQueueHeader } from './SupplyQueueHeader';
import { OptionsTable } from './OptionsTable';
import { SupplyQueueCardsTable } from './CardsTable';
import { SupplyQueueTableDefaultValueCtx } from './context/TSupplyQueueTableContext';
import { initialTableConfig } from './CardsTable/tableConfig';
import { OptionsTablePagination } from './OptionsTable/OptionsTablePagination';
import { CardsTablePagination } from './CardsTable/components/CardsTablePagination';
import { SupplyQueueVariantTableDefaultConfigValueCtx } from './context/TVariantTableConfigContext';
import { variantTableConfig } from './CardsTable/components/VariantTable/variantTableConfig';
import { InputMaybe } from '@/types/ProductsServiceTypes';
import { useTranslations } from 'next-intl';
import { useGetSupplyQueue } from 'app/api/graphqlApiRequests/productService/getAllProducts';
import { useGetSupplyQueueStockUnitsList } from 'app/api/graphqlApiRequests/productService/getStockUnitsByShopId';

export const SupplyQueue = () => {
  const tCommon = useTranslations('common');
  const tMain = useTranslations('main');
  const tTables = useTranslations('tableColumnNames');

  const { page, showTableColumnsArray, rowsCount, searchValue, colorSearch, categorySearch } = useContext(
    SupplyQueueTableDefaultValueCtx,
  );

  const { showVariantTableColumnsArray, variantPage } = useContext(SupplyQueueVariantTableDefaultConfigValueCtx);
  const [activeTab, setActiveTab] = useState(0);
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const mainShopId = useTypedSelector(state => state.profileReducer?.userInfo?.mainShopId);

  const columnKeys: string[] = showTableColumnsArray.map(column => {
    const configItems = initialTableConfig({
      tCommon,
      tMain,
      tTables,
    }).filter(item => item.id === column.id);
    return configItems.map(configItem => configItem.key).join('');
  });

  const { data, isLoading } = useGetSupplyQueue({
    page,
    size: Number(rowsCount?.code) || 10,
    fields: columnKeys.filter(Boolean),
    filter: {
      supply: true,
      name: searchValue,
      minRemains: minValue === '' ? 0 : Number(minValue),
      maxRemains: maxValue === '' ? null : Number(maxValue),
      color: colorSearch ? (colorSearch?.map(m => m.value) as InputMaybe<InputMaybe<string>[]>) : null,
      // TODO привести к нужному типу при подключении компонента
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      category: categorySearch ? categorySearch?.map(m => m.code) : null,
    },
    skip: columnKeys.length === 0 || (!!maxValue && minValue > maxValue),
  });

  const variantTableColumnKeys: string[] = showVariantTableColumnsArray.map(column => {
    const configItems = variantTableConfig({
      tCommon,
      tMain,
      tTables,
    }).filter(item => item.id === column.id);
    return configItems.map(configItem => configItem.key).join('');
  });

  const { data: dataStockUnit, isLoading: stockUnitsLoading } = useGetSupplyQueueStockUnitsList({
    page: variantPage,
    shopId: Number(mainShopId),
    size: Number(rowsCount?.code) || 10,
    fields: variantTableColumnKeys,
    filter: {
      supply: true,
      search: searchValue,
      colors: colorSearch ? (colorSearch?.map(m => m.value) as InputMaybe<InputMaybe<string>[]>) : null,
    },
    skip: !activeTab,
  });

  const tableDataStockUnit = dataStockUnit?.findAllStockUnitByShopId?.content;
  const tableDataStockUnitPageInfo = dataStockUnit?.findAllStockUnitByShopId?.pageInfo;
  const loading = !data && isLoading;
  const pageInfo = data?.getAllProductsByShopId?.pageInfo;
  const tableData = data?.getAllProductsByShopId?.content;
  const tableDataLength = tableData?.length === 0;

  return (
    <>
      <SupplyQueueHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />

      {activeTab === 0 && (
        <>
          <SupplyQueueCardsTable tableData={tableData} isLoading={!data} />
          <CardsTablePagination pageInfo={pageInfo} isLoading={loading} hiddenButtons={tableDataLength} />
        </>
      )}
      {activeTab === 1 && (
        <>
          <OptionsTable tableData={tableDataStockUnit} />
          <OptionsTablePagination
            pageInfo={tableDataStockUnitPageInfo}
            isLoading={stockUnitsLoading}
            hiddenButtons={tableDataLength}
          />
        </>
      )}
    </>
  );
};
