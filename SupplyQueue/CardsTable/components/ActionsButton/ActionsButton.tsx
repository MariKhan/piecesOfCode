import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import { useFetchSupplyQueueStockUnits } from 'app/api/graphqlApiRequests/productService/getStockUnitsByProductId';
import { StockUnitResponse } from 'app/api/types/ProductsServiceTypes';
import { ChangeQuantityItemModal } from 'app/components/ChangeQuantityItemModal';
import { headerTableHeight } from 'app/constants';
import { logisticsPagePaths } from 'app/constants/pagePaths';
import { TMain } from 'app/global';
import { useActions, useTypedSelector } from 'app/hooks/redux';
import useOutsideClick from 'app/hooks/useOutsideClick';
import {
  ArrowLightWhiteIcon,
  DeleteSupplyQueueIcon,
  OnWaySupplyQueueIcon,
} from 'app/styled-components/NewIcons.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState } from 'react';
import { ActionsButtonContainer } from './ActionsButton.styled';
import { ActionsDeleteOverlay } from './DeleteProduct';

const ActionsButtonItemContainer = styled(FlexDir)`
  &:hover {
    background-color: #f5f5f8;
  }
`;

interface IActionsButton {
  selectedRowsLength: number;
}

export const ActionsButton: FC<IActionsButton> = ({ selectedRowsLength }) => {
  const selectedRows = useTypedSelector(state => state.supplyQueueReducer.selectedRows);
  const router = useRouter();
  const [value, setValue] = useState<string>('1');
  const {
    fetchSupplyQueueStockUnits,
    queryResult: { isLoading },
  } = useFetchSupplyQueueStockUnits();

  const [showMenu, setShowMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState<'add' | 'delete' | null>(null);
  const [addRowStep, setAddRowStep] = useState(0);
  const [loadedStockUnits, setLoadedStockUnits] = useState<StockUnitResponse[]>([]);
  const actionMenuRef = useRef<null | HTMLDivElement>(null);
  const tMain = useTranslations('main');
  const nextAddRowStep = () => {
    setAddRowStep(p => {
      if (loadedStockUnits.length > p + 1) {
        return p + 1;
      } else {
        router.push(logisticsPagePaths.DELIVERY_FORMALIZATION);
        setOpenDialog(null);
        setLoadedStockUnits([]);
        setAddRowStep(0);

        return p;
      }
    });
  };

  const showMenuHandler = async () => {
    const fetchPromises = selectedRows
      .filter((f): f is NonNullable<typeof f> => f != null)
      .map(f =>
        fetchSupplyQueueStockUnits({
          productId: f.id,
          filter: { supply: true },
        }).then(res => {
          const stockUnits = res.findAllStockUnitByProductId ?? [];
          return stockUnits.map(m => ({
            ...m,
            productId: f.id,
            supply: true,
          }));
        }),
      );

    const allStockUnits = (await Promise.all(fetchPromises)).flat();
    setLoadedStockUnits(allStockUnits);
    setShowMenu(p => !p);
  };

  const handleOpenDialog = (type: 'add' | 'delete') => {
    setOpenDialog(type);
    setShowMenu(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const actionItems = [
    {
      id: 1,
      title: 'supplyQueue_menuAdd',
      icon: <OnWaySupplyQueueIcon />,
      fn: () => handleOpenDialog('add'),
    },
    {
      id: 2,
      title: 'supplyQueue_menuDelete',
      icon: <DeleteSupplyQueueIcon />,
      fn: () => handleOpenDialog('delete'),
    },
  ];

  const items = [...actionItems];
  useOutsideClick(actionMenuRef, () => setShowMenu(false));
  const selectedRowStep = loadedStockUnits[addRowStep];

  const { setAddedProductsCardsSupply, setAddedVariantCardsSupply, setAddedProductsSupply } = useActions();
  const findItem = selectedRows.find(f => f?.id === selectedRowStep?.productId)!;
  const addedVariantProduct = () => {
    if (selectedRowStep) {
      setAddedProductsCardsSupply(findItem!);
      setAddedVariantCardsSupply(selectedRowStep);
      setAddedProductsSupply({
        productId: Number(findItem?.id),
        stockUnit: {
          stockUnitId: String(selectedRowStep?.id),
          quantity: +value,
          weight: 0,
        },
      });
    }
    nextAddRowStep();
  };

  return (
    <ActionsButtonContainer>
      <div ref={actionMenuRef}>
        <FlexDir
          width='100%'
          height={`${headerTableHeight}px`}
          style={{ cursor: 'pointer' }}
          onClick={showMenuHandler}
          bgColor='#FD6E08'
          alignItems='center'
          justifyContent='center'>
          <FlexDir>
            <Text color='#FFFFFF' fontWeight={500} fontSize='14px'>
              {tMain('supplyQueue_actionsButton_actions')}
            </Text>
            <ArrowLightWhiteIcon showMenu={showMenu} />
          </FlexDir>
        </FlexDir>
        {showMenu && (
          <FlexDir
            padding='12px 0'
            dir='column'
            bgColor='#fff'
            border='1px solid #EAEAEF'
            borderRadius='0 0 16px 16px'
            width='280px'
            style={{ float: 'right' }}>
            {items.map(f => (
              <ActionsButtonItemContainer
                key={f.id}
                style={{ cursor: 'pointer' }}
                padding='10px 0 10px 20px'
                onClick={f.fn}>
                <FlexDir mr='12px'>{f.icon}</FlexDir>
                <Text fontSize='15px' color='#7F80AA'>
                  {tMain(f.title as keyof TMain['main'])}
                </Text>
              </ActionsButtonItemContainer>
            ))}
          </FlexDir>
        )}
      </div>
      <ChangeQuantityItemModal
        isMulti
        item={selectedRowStep}
        openModal={openDialog === 'add'}
        toggleModal={handleCloseDialog}
        value={value}
        setValue={setValue}
        addItem={addedVariantProduct}
        max={selectedRowStep?.supplyQuantity ?? 0}
        steps={{ step: addRowStep + 1, maxSteps: loadedStockUnits.length }}
      />
      <Dialog
        open={openDialog === 'delete'}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            maxWidth: '580px',
            width: '580px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        <ActionsDeleteOverlay toggleModal={() => setOpenDialog(null)} selectedRowsLength={selectedRowsLength} />
      </Dialog>
    </ActionsButtonContainer>
  );
};
