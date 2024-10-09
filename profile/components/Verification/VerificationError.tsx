import { FlexDir, Text } from 'app/styled-components/styles';
import Lottie from 'lottie-react';
import DocumentRejectedAnimation from 'app/utils/animations/DocumentRejected.json';
import { useTranslations } from 'next-intl';
import { Button } from 'app/components/ui/NewButton';
import CloseIcon from '@mui/icons-material/Close';
import { settingsPagePaths } from 'app/constants/pagePaths';
import { useRouter } from 'next/navigation';

interface VerificationErrorProps {
  toggleModal: () => void;
}

export const VerificationError = ({ toggleModal }: VerificationErrorProps) => {
  const tMain = useTranslations('main');
  const router = useRouter();

  return (
    <FlexDir dir='column' alignItems='center' style={{ position: 'relative' }}>
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
      <FlexDir width='120px' height='120px' mb='36px'>
        <Lottie animationData={DocumentRejectedAnimation} />
      </FlexDir>
      <Text fontSize='24px' lineHeight='30px' fontWeight={600} color='#1E2057' mb='16px'>
        {tMain('main_verificationError')}
      </Text>
      <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA' mb='24px' textAlign='center'>
        {tMain('main_weWereUnableToApprove')}
      </Text>

      <Button onClick={() => router.push(settingsPagePaths.PROFILE_VERIFICATION)}>{tMain('main_updateData')}</Button>
    </FlexDir>
  );
};
