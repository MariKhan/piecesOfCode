import { useState } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import Lottie from 'lottie-react';
import CompanyAnimation from 'app/utils/animations/EmptyCompanyAnimation.json';
import { Button } from 'app/components/ui/NewButton';
import { PlusCircleOpacity36Icon } from 'app/styled-components/NewIcons.styled';
import { useTranslations } from 'next-intl';
import Dialog from '@mui/material/Dialog';
import { AddCompanyModal } from './AddCompanyModal';

interface NoCompaniesProps {
  isCustomerCompany: boolean;
}

export const NoCompanies = ({ isCustomerCompany }: NoCompaniesProps) => {
  const tProfile = useTranslations('profile');
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(p => !p);
  };

  return (
    <FlexDir dir='column' alignItems='center' justifyContent='center' height='100%' gap='24px'>
      <FlexDir width='80px' height='80px'>
        <Lottie animationData={CompanyAnimation} />
      </FlexDir>
      <FlexDir dir='column' gap='8px'>
        <Text fontSize='17px' fontWeight={600} lineHeight='23px'>
          {tProfile('NotCompanies')}
        </Text>
        <Text
          textAlign='center'
          width='300px'
          fontSize='14px'
          fontWeight={500}
          lineHeight='20px'
          color='rgba(127, 128, 170, 1)'>
          {tMain('company_companyList_startYourOwnCompany')}
        </Text>
      </FlexDir>
      <FlexDir>
        <Button variant='secondary' size='medium' icon={<PlusCircleOpacity36Icon />} onClick={toggleModal}>
          {tCommon('common_addCompany')}
        </Button>
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
  );
};
