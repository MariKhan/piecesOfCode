import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetColoursQuery } from 'app/store/features/lookup-services/lookup-services.api';
import { FlexDir } from 'app/styled-components/styles';
import { SearchInput } from 'app/components/ui';
import { SelectV2 } from 'app/components/SelectV2';
import { NotesIcon, ReportsIcon } from 'app/styled-components/NewIcons.styled';
import { TableVariantSwitcher } from 'app/components/TableVariantSwitcher';
import { SupplyQueueTableDefaultValueCtx } from '../../context/TSupplyQueueTableContext';
import { ColorsSelect } from 'app/components/ColorsSelect';
import { Option } from 'app/components/ui/Select/Select';
import { RemainsSelect } from 'app/components/RemainsSelect';
import { InDev } from 'app/components/inDev';

interface ISupplyQueueFilters {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: Dispatch<SetStateAction<string>>;
  setMinValue: Dispatch<SetStateAction<string>>;
}

export const SupplyQueueFilters: FC<ISupplyQueueFilters> = ({ activeTab, setActiveTab, setMaxValue, setMinValue }) => {
  const tCommon = useTranslations('common');

  const [value, setValue] = useState('');

  const { setSearchValue, setColorSearch, colorSearch, categorySearch, setCategorySearch } = useContext(
    SupplyQueueTableDefaultValueCtx,
  );
  const { data: colours, isLoading } = useGetColoursQuery('');

  const tabs = [
    { icon: <ReportsIcon /> },
    {
      icon: <NotesIcon />,
    },
  ];
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e);
    setValue(e.currentTarget.value);
  };

  const options = colours?.map((m: { name: string; code: string }) => ({ label: m.name, value: m.code }));

  return (
    <>
      <FlexDir gap='12px' mt='20px' mb='12px' height='48px' style={{ zIndex: 7 }}>
        <SearchInput
          widthWrapper='100%'
          width='100%'
          height='48px'
          border='1px solid #EAEAEF'
          placeholder='Search by product name'
          searchValue={value}
          changeInputSearch={changeInputHandler}
        />
        <ColorsSelect
          options={options}
          isLoading={isLoading}
          value={colorSearch || []}
          onChange={newColorsArr => setColorSearch(newColorsArr as Option[])}
        />
        <InDev>
          <SelectV2
            placeholder={tCommon('common_category')}
            options={[]}
            hidePlaceholderOnSelect
            onChange={selection => {
              setCategorySearch(selection);
            }}
          />
        </InDev>
        <RemainsSelect setMaxValue={setMaxValue} setMinValue={setMinValue} />
        <TableVariantSwitcher tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </FlexDir>
    </>
  );
};
