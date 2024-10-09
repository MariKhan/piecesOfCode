import { Skeleton } from '@mui/material';
import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Input, Pagination } from './CardsTablePagination.styled';
import { useTranslations } from 'next-intl';
import { SupplyQueueTableDefaultValueCtx } from '../../../context/TSupplyQueueTableContext';
import { Maybe } from 'graphql/jsutils/Maybe';
import { PageInfo } from '@/types/ProductsServiceTypes';

interface PaginationProps {
  pageInfo?: Maybe<PageInfo>;
  hiddenButtons: boolean;
  isLoading: boolean;
}

export const CardsTablePagination: FC<PaginationProps> = ({ pageInfo, isLoading, hiddenButtons }) => {
  const { page, setPage } = useContext(SupplyQueueTableDefaultValueCtx);
  const [goToPage, setGoToPage] = useState('');
  const tCommon = useTranslations('common');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '0') return;
    if (value === '' || (/^\d*$/.test(value) && parseInt(value, 10) <= Number(pageInfo?.totalPages))) {
      setGoToPage(value);
      if (value !== '') {
        setPage(+value - 1);
      }
    }
  };
  return pageInfo?.totalPages === 1 ? null : (
    <FlexDir width='100%' justifyContent='space-between'>
      {!isLoading && hiddenButtons ? null : !isLoading ? (
        <>
          <Pagination
            count={pageInfo?.totalPages ?? 0}
            defaultPage={1}
            boundaryCount={1}
            page={page + 1}
            onChange={(_, page) => setPage(page - 1)}
            siblingCount={2}
            shape='rounded'
            style={{ marginTop: 20 }}
          />
          <FlexDir gap='10px' alignItems='center'>
            <Text fontSize='12px' color='#50528C'>
              {tCommon('common_goToPage')}
            </Text>
            <Input ref={inputRef} value={goToPage} onChange={handleInputChange} pattern='[0-9]*' />
          </FlexDir>
        </>
      ) : (
        <FlexDir gap='10px' pt='20px' alignItems='center'>
          <KeyboardArrowLeftIcon htmlColor='#50528C' opacity='0.4' />
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} variant='rounded' width={34} height={32} style={{ borderRadius: '8px' }} />
          ))}
          <KeyboardArrowRightIcon htmlColor='#50528C' opacity='0.4' />
        </FlexDir>
      )}
    </FlexDir>
  );
};
