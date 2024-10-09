import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Attention84Icon } from 'app/styled-components/NewIcons.styled';
import { Button } from 'app/components/ui/NewButton';
import { useDeleteSupplyListMutation } from 'app/store/features/supplyQueue/supplyQueue.api';
import { useActions, useTypedSelector } from 'app/hooks/redux';
import { useQueryClient } from '@tanstack/react-query';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useFetchSupplyQueueStockUnits } from 'app/api/graphqlApiRequests/logisticService/getStockUnitsByProductId';
import { SUPPLY_QUEUE } from 'app/api/graphqlApiRequests/productService/queryKeys';
import CloseIcon from '@mui/icons-material/Close';

interface IActionsDeleteOverlay {
  toggleModal: () => void;
  selectedRowsLength?: number;
}

export const ActionsDeleteOverlay: FC<IActionsDeleteOverlay> = ({ toggleModal, selectedRowsLength }) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  const selectedRowsId = useTypedSelector(state => state.supplyQueueReducer.selectedRows);
  const queryClient = useQueryClient();
  const [deleteSupplyList] = useDeleteSupplyListMutation();
  const { clearAllSelectedRowsSupply } = useActions();

  const {
    fetchSupplyQueueStockUnits,
    queryResult: { isLoading },
  } = useFetchSupplyQueueStockUnits();

  const loadStockUnitsHandler = async () => {
    let combinedNewStockUnitsIds: number[] = [];

    const fetchPromises = selectedRowsId
      .filter(f => f?.id)
      .map(f => {
        if (f && f.id) {
          return fetchSupplyQueueStockUnits({ productId: f.id, filter: { supply: true } }).then(res => {
            const patchedStockUnits = (stockunits: Maybe<Maybe<StockUnitResponse>[]> | undefined) => {
              if (!stockunits) {
                return [];
              }
              return stockunits.map(m => ({ ...m, productId: Number(f.id) }));
            };

            const newStockUnits = patchedStockUnits(res.findAllStockUnitByProductId);
            const newStockUnitsIds = newStockUnits?.map(item => Number(item.id)) || [];
            combinedNewStockUnitsIds = combinedNewStockUnitsIds.concat(newStockUnitsIds);
          });
        }
      });

    await Promise.all(fetchPromises);

    if (combinedNewStockUnitsIds.length > 0) {
      await deleteSupplyList(combinedNewStockUnitsIds);
    }

    queryClient.invalidateQueries({ queryKey: [SUPPLY_QUEUE] });
    toggleModal();
    clearAllSelectedRowsSupply();
  };

  return (
    <FlexDir alignItems='center' dir='column' gap='24px' style={{ position: 'relative' }}>
      <FlexDir
        cursor='pointer'
        onClick={toggleModal}
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: '0',
          right: '0',
        }}>
        <CloseIcon htmlColor='#1E2057' />
      </FlexDir>

      <Attention84Icon />
      <Text fontSize='24px' lineHeight='32px' fontWeight={500}>
        {tMain('supplyQueue_ActionsDeleteOverlay_title')}
      </Text>
      <Text fontSize='16px' lineHeight='24px' fontWeight={500} textAlign='center' color='#7F80AA'>
        {tMain('supplyQueue_ActionsDeleteOverlay_confirm', {
          count: selectedRowsLength,
        })}
      </Text>
      <FlexDir width='100%' gap='24px'>
        <Button variant='secondary' onClick={loadStockUnitsHandler} disabled={isLoading}>
          {tCommon('common_confirm')}
        </Button>
        <Button outlined onClick={toggleModal}>
          {tCommon('common_back')}
        </Button>
      </FlexDir>
    </FlexDir>
  );
};
