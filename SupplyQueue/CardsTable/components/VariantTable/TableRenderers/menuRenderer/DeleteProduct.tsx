import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Attention84Icon } from 'app/styled-components/NewIcons.styled';
import { Button } from 'app/components/ui/NewButton';
import { useDeleteStockunitMutation } from 'app/store/features/supplyQueue/supplyQueue.api';
import { useQueryClient } from '@tanstack/react-query';
import { useActions } from 'app/hooks/redux';
import { Maybe } from 'app/api/types/ProductsServiceTypes';
import CloseIcon from '@mui/icons-material/Close';
import {
  SUPPLY_QUEUE_STOCK_UNITS_LIST_BY_PRODUCT_ID,
  SUPPLY_QUEUE_STOCK_UNITS_LIST_BY_SHOP_ID,
} from 'app/api/graphqlApiRequests/productService/queryKeys';

interface IActionsDeleteOverlay {
  handleCloseDialog: () => void;
  stockUnitId?: number | Maybe<string> | undefined;
}

export const ActionsDeleteOverlay: FC<IActionsDeleteOverlay> = ({ handleCloseDialog, stockUnitId }) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  const [deleteSupplyStockunit] = useDeleteStockunitMutation();
  const { clearAllSelectedRows, clearAllSelectedRowsSupply } = useActions();

  const queryClient = useQueryClient();

  const deleteStockunitHandler = async () => {
    if (stockUnitId) {
      await deleteSupplyStockunit(stockUnitId);

      await queryClient.invalidateQueries({
        queryKey: [SUPPLY_QUEUE_STOCK_UNITS_LIST_BY_SHOP_ID],
      });

      await queryClient.invalidateQueries({
        queryKey: [SUPPLY_QUEUE_STOCK_UNITS_LIST_BY_PRODUCT_ID],
      });
      handleCloseDialog();
      clearAllSelectedRowsSupply();
      clearAllSelectedRows();
    }
  };

  return (
    <FlexDir alignItems='center' dir='column' gap='24px' style={{ position: 'relative' }}>
      <FlexDir
        cursor='pointer'
        onClick={handleCloseDialog}
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
        {tMain('supplyQueue_ActionsDeleteOverlay_title_stockUnits')}
      </Text>
      <Text fontSize='16px' lineHeight='24px' fontWeight={500} textAlign='center' color='#7F80AA'>
        {tMain('supplyQueue_ActionsDeleteOverlay_confirm_stockUnits', {
          count: 1,
        })}
      </Text>
      <FlexDir width='100%' gap='24px'>
        <Button variant='secondary' onClick={deleteStockunitHandler}>
          {tCommon('common_confirm')}
        </Button>
        <Button outlined onClick={handleCloseDialog}>
          {tCommon('common_back')}
        </Button>
      </FlexDir>
    </FlexDir>
  );
};
