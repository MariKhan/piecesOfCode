import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { SettingsBlue24Icon } from 'app/styled-components/NewIcons.styled';
import { Drawer } from 'app/components/Drawer';
import { SettingsButtonItem } from './SettingsButtonItem';
import { FlexDir, Text } from 'app/styled-components/styles';
import { hashData } from 'app/utils/hashData';
import { useTranslations } from 'next-intl';
import styled from '@emotion/styled';
import { headerTableHeight } from 'app/constants';
import { SupplyQueueVariantTableDefaultConfigValueCtx } from '../../context/TVariantTableConfigContext';

export const LastVariantHeaderCell = styled(FlexDir)`
  height: ${headerTableHeight}px;
  width: 60px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: -4px 0 20px 0 #1e20570f;
  border-left: 1px solid #50528c29;
`;
export const SettingsButton = () => {
  const {
    sortedInitialVariantTableConfig,
    sortedVariantTableConfig,
    setInitialSortedVariantTableConfig,
    setSortedVariantTableConfig,
    showVariantTableColumnsArray,
  } = useContext(SupplyQueueVariantTableDefaultConfigValueCtx);
  const tMain = useTranslations('main');
  const [open, setOpen] = useState(false);

  const dragPerson = useRef<number>(0);
  const dragOverPerson = useRef<number>(0);

  const toggleDrawerHandler = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleDragEnd = () => {
    const cloneArr = [...sortedVariantTableConfig];
    const cloneInitArr = [...sortedInitialVariantTableConfig];
    const tempInit = cloneInitArr[dragPerson.current];
    const temp = cloneArr[dragPerson.current];
    cloneInitArr[dragPerson.current] = cloneInitArr[dragOverPerson.current];
    cloneArr[dragPerson.current] = cloneArr[dragOverPerson.current];
    cloneInitArr[dragOverPerson.current] = tempInit;
    cloneArr[dragOverPerson.current] = temp;
    setSortedVariantTableConfig(cloneArr);
    setInitialSortedVariantTableConfig(cloneInitArr);
  };
  useLayoutEffect(() => {
    localStorage.setItem(
      'showVariantSupplyQueueColumn',
      hashData(showVariantTableColumnsArray, 'showVariantSupplyQueueColumn'),
    );
    localStorage.setItem(
      'supplyQueueVariantColumnConfig',
      hashData(sortedInitialVariantTableConfig, 'supplyQueueVariantColumnConfig'),
    );
  }, [showVariantTableColumnsArray, sortedInitialVariantTableConfig]);
  return (
    <>
      <LastVariantHeaderCell onClick={toggleDrawerHandler}>
        <SettingsBlue24Icon />
      </LastVariantHeaderCell>
      <Drawer
        open={open}
        onClose={toggleDrawerHandler}
        orientation='right'
        width='450px'
        slots={{
          headerSlot: (
            <Text color='#1E2057' fontWeight={500}>
              {tMain('products_variantTableSettings')}
            </Text>
          ),
          bodySlot: (
            <FlexDir dir='column' gap='40px'>
              <FlexDir dir='column' gap='12px'>
                <Text color='#50528C' fontSize='15px' fontWeight={500}>
                  {tMain('main_displayedParameters')}
                </Text>
                {sortedInitialVariantTableConfig.map((m, index) => (
                  <div
                    draggable
                    onDragStart={() => (dragPerson.current = index)}
                    onDragEnter={() => (dragOverPerson.current = index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={e => e.preventDefault()}
                    key={m.id}>
                    {m.id !== 10 && m.id !== 1 && (
                      <SettingsButtonItem headerCellName={m.headerCellName} id={m.id} index={index} />
                    )}
                  </div>
                ))}
              </FlexDir>
            </FlexDir>
          ),
        }}
      />
    </>
  );
};
