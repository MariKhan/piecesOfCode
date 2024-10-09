import { FC, memo, useContext } from 'react';
import { TableHeaderCell } from '../../Table.styled';
import { SettingsButton } from '../SettingsButton';
import { FlexDir, Text } from 'app/styled-components/styles';
import { TableSortingIcon } from 'app/styled-components/NewIcons.styled';
import { deepEqual } from 'app/utils/deepEqual';
import { SupplyQueueTableDefaultValueCtx } from '../../../context/TSupplyQueueTableContext';
import { TableConfigType } from '../../../types';

interface TableHeaderRendererProps {
  item: TableConfigType;
  columnWidth: string | number;
}

export const TableHeaderRenderer: FC<TableHeaderRendererProps> = memo(({ item, columnWidth }) => {
  const { sortable, id, showColumn, headerCellName } = item;
  const { showTableColumnsArray } = useContext(SupplyQueueTableDefaultValueCtx);

  const showTableColumnsArrayIds = showTableColumnsArray.map(m => m.id);
  const onlyCheckboxAndSettings =
    showTableColumnsArrayIds.includes(1) &&
    showTableColumnsArrayIds.includes(10) &&
    showTableColumnsArrayIds.length === 2;
  const width = onlyCheckboxAndSettings
    ? id === 1
      ? '100%'
      : id === 10
      ? '60px'
      : `${columnWidth}px`
    : id === 1
    ? '40px'
    : id === 10 || id === 9
    ? '60px'
    : `${columnWidth}px`;

  return (
    <>
      {showColumn && (
        <TableHeaderCell sx={{ zIndex: '5' }} key={id} width={width}>
          {headerCellName ? (
            <FlexDir alignItems='center' gap='4px'>
              <Text fontSize='14px' fontWeight={500} color='#1E2057' style={{ opacity: '0.48' }}>
                {headerCellName}
              </Text>
              {sortable && <TableSortingIcon sorted />}
            </FlexDir>
          ) : id === 1 ? (
            // <CheckboxStyled bgColor='#fff' onChange={() => {}} />
            <div />
          ) : (
            id === 10 && <SettingsButton />
          )}
        </TableHeaderCell>
      )}
    </>
  );
}, deepEqual);
