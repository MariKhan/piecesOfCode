import { FC, useContext } from 'react';
import { ToggleSwitch } from 'app/components/ui';
import { FlexDir, Text } from 'app/styled-components/styles';
import { ListDragIcon } from 'app/styled-components/NewIcons.styled';
import { SupplyQueueVariantTableDefaultConfigValueCtx } from '../../context/TVariantTableConfigContext';
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
  const { setShowVariantTableColumnsArray, showVariantTableColumnsArray } = useContext(
    SupplyQueueVariantTableDefaultConfigValueCtx,
  );
  const onchangeCheckedHandler = () => {
    if (showVariantTableColumnsArray.some(item => item.id === id)) {
      setShowVariantTableColumnsArray(prevState => prevState.filter(f => f.id !== id));
    } else {
      setShowVariantTableColumnsArray(prevState => [...prevState, { id, index }]);
    }
  };
  const isChecked = showVariantTableColumnsArray.some(item => item.id === id);
  return (
    <NoSelectDiv>
      <FlexDir alignItems='center'>
        <ListDragIcon />
        <Text color='#50528C' fontSize='14px' fontWeight={500} key={id}>
          {headerCellName}
        </Text>
      </FlexDir>
      {id !== 2 && <ToggleSwitch checked={isChecked} onChange={onchangeCheckedHandler} />}
    </NoSelectDiv>
  );
};
