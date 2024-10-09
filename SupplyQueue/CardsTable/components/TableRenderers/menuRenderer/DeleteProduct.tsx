import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Attention84Icon } from 'app/styled-components/NewIcons.styled';
import { Button } from 'app/components/ui/NewButton';
import { useDeleteSupplyListMutation } from 'app/store/features/supplyQueue/supplyQueue.api';
import { useQueryClient } from '@tanstack/react-query';
import { Maybe } from 'graphql/jsutils/Maybe';
import CloseIcon from '@mui/icons-material/Close';
import { SUPPLY_QUEUE } from 'app/api/graphqlApiRequests/productService/queryKeys';

interface IActionsDeleteOverlay {
  toggleModal: () => void;
  stockUnitIds: Maybe<string>[] | undefined;
}

export const ActionsDeleteOverlay: FC<IActionsDeleteOverlay> = ({ toggleModal, stockUnitIds }) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  const [deleteSupplyList] = useDeleteSupplyListMutation();
  const queryClient = useQueryClient();

  const onClickDeleteHandler = () => {
    const newStockUnitsIds = stockUnitIds?.map(id => Number(id));

    deleteSupplyList(newStockUnitsIds)
      .unwrap()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [SUPPLY_QUEUE] });
        toggleModal();
      });
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
          count: 1,
        })}
      </Text>
      <FlexDir width='100%' gap='24px'>
        <Button variant='secondary' onClick={onClickDeleteHandler}>
          {tCommon('common_confirm')}
        </Button>
        <Button outlined onClick={toggleModal}>
          {tCommon('common_back')}
        </Button>
      </FlexDir>
    </FlexDir>
  );
};
