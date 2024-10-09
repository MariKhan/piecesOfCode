import { useContext, useRef, useState } from 'react';
import { LastHeaderCell } from '../../Table.styled';
import { SettingsBlue24Icon } from 'app/styled-components/NewIcons.styled';
import { Drawer } from 'app/components/Drawer';
import { SettingsButtonItem } from './SettingsButtonItem';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Select } from 'app/components/ui';
import { hashData } from 'app/utils/hashData';
import { useTranslations } from 'next-intl';
import { supplyQueueRowsCountOptions } from '../../../context/SupplyQueueTableContext';
import { SupplyQueueTableDefaultValueCtx } from '../../../context/TSupplyQueueTableContext';

export const SettingsButton = () => {
  const {
    tableConfig,
    setTableConfig,
    initialConfig,
    setInitialConfig,
    rowsCount,
    setRowsCount,
    showTableColumnsArray,
  } = useContext(SupplyQueueTableDefaultValueCtx);
  const tMain = useTranslations('main');
  const [open, setOpen] = useState(false);

  const dragPerson = useRef<number>(0);
  const dragOverPerson = useRef<number>(0);

  const toggleDrawerHandler = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleDragEnd = () => {
    const cloneArr = [...tableConfig];
    const cloneInitArr = [...initialConfig];
    const tempInit = cloneInitArr[dragPerson.current];
    const temp = cloneArr[dragPerson.current];
    cloneInitArr[dragPerson.current] = cloneInitArr[dragOverPerson.current];
    cloneArr[dragPerson.current] = cloneArr[dragOverPerson.current];
    cloneInitArr[dragOverPerson.current] = tempInit;
    cloneArr[dragOverPerson.current] = temp;
    setTableConfig(cloneArr);
    setInitialConfig(cloneInitArr);
    localStorage.setItem('showSupplyQueueColumn', hashData(showTableColumnsArray, 'showSupplyQueueColumn'));
    localStorage.setItem('supplyQueueColumnConfig', hashData(initialConfig, 'supplyQueueColumnConfig'));
  };

  return (
    <div>
      <LastHeaderCell onClick={toggleDrawerHandler}>
        <SettingsBlue24Icon />
      </LastHeaderCell>

      <Drawer
        open={open}
        onClose={toggleDrawerHandler}
        orientation='right'
        width='450px'
        slots={{
          headerSlot: (
            <Text color='#1E2057' fontWeight={500}>
              {tMain('products_tableSettings')}
            </Text>
          ),
          bodySlot: (
            <FlexDir dir='column' gap='40px'>
              <FlexDir dir='column' gap='5px'>
                <Text color='#50528C' fontSize='15px' fontWeight={500}>
                  {tMain('products_otherParameters')}
                </Text>
                <FlexDir alignItems='center' justifyContent='space-between'>
                  <Text color='#50528C' fontSize='14px' fontWeight={500}>
                    {tMain('products_numberOfRows')}
                  </Text>
                  <Select
                    height='45px'
                    readOnly
                    width='100px'
                    options={supplyQueueRowsCountOptions}
                    value={rowsCount}
                    onChange={setRowsCount}
                    hiddenRemoveIcon
                  />
                </FlexDir>
              </FlexDir>
              <FlexDir dir='column' gap='12px'>
                <Text color='#50528C' fontSize='15px' fontWeight={500}>
                  {tMain('main_displayedParameters')}
                </Text>
                {initialConfig.map((m, index) => (
                  <div
                    draggable
                    onDragStart={() => (dragPerson.current = index)}
                    onDragEnter={() => (dragOverPerson.current = index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={e => e.preventDefault()}
                    key={m.id}>
                    {m.id !== 10 && m.id !== 9 && m.id !== 1 && (
                      <SettingsButtonItem headerCellName={m.headerCellName} id={m.id} index={index} />
                    )}
                  </div>
                ))}
              </FlexDir>
            </FlexDir>
          ),
        }}
      />
    </div>
  );
};
