import React, { useRef, useState } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { ICompanyCard } from 'app/utils/interfaces';
import { Skeleton } from '@mui/material';
import AddIcon from '../../../../../../public/static/newIcons/profile/Add.svg';
import Dialog from '@mui/material/Dialog';
import { VerticalScrollbarWithAnimation } from 'app/components/VerticalScrollbarWithAnimation';
import { useGetCompaniesQuery } from 'app/store/features/company/company.api';
import { useTranslations } from 'next-intl';
import { CompaniesCard } from './CompaniesCard';
import { AddCompanyModal } from './AddCompanyModal';
import { NoCompanies } from './NoCompanies';

export const CompaniesList = () => {
  const tProfile = useTranslations('profile');
  const parentRef = useRef<HTMLDivElement>(null);

  const { data: companies, isLoading: isCompaniesLoading } = useGetCompaniesQuery('');

  // TODO: В будущем надо делать отдельную ручку чтобы получить информацию была ли пользователем создана компания CUSTOMER или нет

  const isCustomerCompany = companies?.some((company: ICompanyCard) => company.type === 'CUSTOMER');

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(p => !p);
  };

  return (
    <>
      {!isCompaniesLoading && companies?.length > 0 ? (
        <VerticalScrollbarWithAnimation scrollableRef={parentRef}>
          <FlexDir dir='column' gap='16px' mb='16px'>
            {!isCompaniesLoading &&
              companies?.map((company: ICompanyCard) => (
                <CompaniesCard key={company.companyId} {...company} isCompaniesLoading={isCompaniesLoading} />
              ))}

            <FlexDir
              bgColor='#F7F7FA'
              padding='18px'
              borderRadius='12px'
              justifyContent='center'
              cursor='pointer'
              onClick={toggleModal}>
              <FlexDir alignItems='center' gap='12px'>
                <AddIcon />
                <Text fontSize='14px' lineHeight='20px' fontWeight={500} color='#50528C' textAlign='center'>
                  {tProfile('profile_addMoreCompany')}
                </Text>
              </FlexDir>
              <Dialog
                open={openModal}
                onClose={toggleModal}
                PaperProps={{
                  sx: {
                    maxWidth: '584px',
                    width: '584px',
                    borderRadius: '40px',
                    padding: '40px',
                  },
                }}>
                <AddCompanyModal toggleModal={toggleModal} isCustomerCompany={isCustomerCompany} />
              </Dialog>
            </FlexDir>
          </FlexDir>
        </VerticalScrollbarWithAnimation>
      ) : (
        !companies &&
        [1, 2, 3].map((_, index) => (
          <Skeleton key={index} variant='rectangular' width='100%' height={230} style={{ borderRadius: 16 }} />
        ))
      )}
      {companies?.length === 0 && !isCompaniesLoading && <NoCompanies isCustomerCompany={isCustomerCompany} />}
    </>
  );
};
