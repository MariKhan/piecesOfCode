import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import { StockUnitResponse } from 'app/api/types/ProductsServiceTypes';
import { headerTableHeight } from 'app/constants';
import { TMain } from 'app/global';
import useOutsideClick from 'app/hooks/useOutsideClick';
import {
  ArrowLightWhiteIcon,
  DeleteSupplyQueueIcon,
  OnWaySupplyQueueIcon,
} from 'app/styled-components/NewIcons.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useTranslations } from 'next-intl';
import { FC, useRef, useState } from 'react';
import { ActionsAddOverlay, ActionsDeleteOverlay } from '../../ProductManager';
import { ActionsButtonContainer } from './ActionsButton.styled';

const ActionsButtonItemContainer = styled(FlexDir)`
  &:hover {
    background-color: #f5f5f8;
  }
`;

interface IActionsButton {
  selectedRows?: Maybe<StockUnitResponse>[];
  variantsIdArray: number[];
}

export const ActionsButton: FC<IActionsButton> = ({ selectedRows, variantsIdArray }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState<'add' | 'delete' | null>(null);
  const actionMenuRef = useRef<null | HTMLDivElement>(null);
  const tMain = useTranslations('main');

  const showMenuHandler = () => {
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
      <Dialog
        open={openDialog === 'add'}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            maxWidth: '580px',
            width: '580px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        {openDialog === 'add' && <ActionsAddOverlay handleCloseDialog={handleCloseDialog} />}
        {/* TODO Разобраться в модалке выше, почему она ничего не меняет, и ничего не получает, потом привести это к универсальному компоненту как в MenuRender, и удалить компонент ActionsAddOverlay */}
      </Dialog>
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
        <ActionsDeleteOverlay
          handleCloseDialog={handleCloseDialog}
          selectedRowsLength={selectedRows?.length}
          variantsIdArray={variantsIdArray}
        />
      </Dialog>
    </ActionsButtonContainer>
  );
};
