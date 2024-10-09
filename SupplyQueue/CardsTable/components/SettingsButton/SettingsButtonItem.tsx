import { FC, useContext, useEffect } from 'react';
import { ToggleSwitch } from 'app/components/ui';
import { FlexDir, Text } from 'app/styled-components/styles';
import { ListDragIcon } from 'app/styled-components/NewIcons.styled';
import { SupplyQueueTableDefaultValueCtx } from '../../../context/TSupplyQueueTableContext';
import { hashData } from 'app/utils/hashData';
import styled from '@emotion/styled';

interface SettingsButtonItemProps {
  headerCellName: string;
  id: number;
  index: number;
}

const NoSelectDiv = styled(FlexDir)`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  justify-content: space-between;
`;

export const SettingsButtonItem: FC<SettingsButtonItemProps> = ({ headerCellName, id, index }) => {
  const { setShowTableColumnsArray, showTableColumnsArray, initialConfig } = useContext(
    SupplyQueueTableDefaultValueCtx,
  );

  useEffect(() => {
    localStorage.setItem('showSupplyQueueColumn', hashData(showTableColumnsArray, 'showSupplyQueueColumn'));
    localStorage.setItem('supplyQueueColumnConfig', hashData(initialConfig, 'supplyQueueColumnConfig'));
  }, [initialConfig, showTableColumnsArray]);
  const onchangeCheckedHandler = () => {
    if (showTableColumnsArray.some(item => item.id === id)) {
      setShowTableColumnsArray(prevState => prevState.filter(f => f.id !== id));
    } else {
      setShowTableColumnsArray(prevState => [...prevState, { id, index }]);
    }
  };

  return (
    <NoSelectDiv>
      <FlexDir alignItems='center'>
        <ListDragIcon />
        <Text color='#50528C' fontSize='14px' fontWeight={500} key={id}>
          {headerCellName}
        </Text>
      </FlexDir>
      {id === 2 ? null : (
        <ToggleSwitch checked={showTableColumnsArray.some(item => item.id === id)} onChange={onchangeCheckedHandler} />
      )}
    </NoSelectDiv>
  );
};
