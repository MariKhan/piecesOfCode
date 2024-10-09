import { FlexDir, Text } from 'app/styled-components/styles';
import Lottie from 'lottie-react';
import DocumentScanningProcessingAnimation from 'app/utils/animations/DocumentScanningProcessing.json';
import { Clock24WhiteIcon } from 'app/styled-components/NewIcons.styled';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';

interface VerifyingProps {
  toggleModal: () => void;
}

export const Verifying = ({ toggleModal }: VerifyingProps) => {
  const tMain = useTranslations('main');

  return (
    <>
      <FlexDir dir='column' alignItems='center' justifyContent='center' style={{ position: 'relative' }}>
        <FlexDir
          cursor='pointer'
          onClick={toggleModal}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            top: '0',
            right: '0',
          }}>
          <CloseIcon htmlColor='#1E2057' />
        </FlexDir>
        <FlexDir width='120px' height='120px' mb='32px'>
          <Lottie animationData={DocumentScanningProcessingAnimation} />
        </FlexDir>
        <FlexDir justifyContent='space-between' bgColor='#7F80AA' borderRadius='12px' mb='24px' padding='8px 16px'>
          <Clock24WhiteIcon style={{ marginRight: '8px' }} />
          <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#FFF' mr='25px'>
            {tMain('main_verificationPeriod')}
          </Text>
          <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#FFF'>
            {tMain('main_verificationPeriodHours')}
          </Text>
        </FlexDir>
        <Text fontSize='24px' lineHeight='30px' fontWeight={600} color='#1E2057' mb='16px'>
          {tMain('main_verifyingYourDocuments')}
        </Text>
        <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA' textAlign='center'>
          {tMain('main_whileYouWaitingYouCanCreateShop')}
        </Text>
      </FlexDir>
    </>
  );
};
