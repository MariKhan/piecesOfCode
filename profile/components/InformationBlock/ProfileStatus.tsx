import { FlexDir } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import { UserProfileInfoDto } from '@/types/userServiceTypes';
import VerificationIcon from '../../../../../public/static/newIcons/profile/Verification.svg';
import TimeIcon from '../../../../../public/static/newIcons/profile/Time.svg';
import AlertIcon from '../../../../../public/static/newIcons/profile/Alert.svg';
import { Button } from 'app/components/ui/NewButton';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { VerificationError } from '../Verification';
import { Verifying } from 'app/view/profile/components/Verification/Verifying';
import { settingsPagePaths } from 'app/constants/pagePaths';
import { useRouter } from 'next/navigation';

interface ProfileInformationProps {
  profileData: UserProfileInfoDto;
}

export const ProfileStatus = ({ profileData }: ProfileInformationProps) => {
  const tMain = useTranslations('main');
  const tProfile = useTranslations('profile');

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [openModalVerifying, setOpenModalVerifying] = useState(false);

  const toggleModal = () => {
    setOpenModal(p => !p);
  };
  const toggleModalVerifying = () => {
    setOpenModalVerifying(p => !p);
  };
  const verificationStatusMap = {
    NOT_CONFIRMED: (
      <FlexDir>
        <Button size='small' onClick={() => router.push(settingsPagePaths.PROFILE_VERIFICATION)}>
          <VerificationIcon />
          {tMain('main_verification')}
        </Button>
      </FlexDir>
    ),
    UNDER_REVIEW: (
      <FlexDir>
        <Button variant='tertiary' size='small' onClick={toggleModalVerifying}>
          {tProfile('profile_waitingForVerification')}
          <TimeIcon />
        </Button>
      </FlexDir>
    ),
    REJECTED: (
      <FlexDir>
        <Button variant='negative' size='small' onClick={toggleModal}>
          {tProfile('profile_verificationDenied')}
          <AlertIcon />
        </Button>
      </FlexDir>
    ),
    CONFIRMED: null,
  };

  return (
    <>
      <FlexDir>{profileData?.status && verificationStatusMap[profileData?.status]}</FlexDir>
      <Dialog
        open={openModal}
        onClose={toggleModal}
        PaperProps={{
          sx: {
            maxWidth: '450px',
            width: '450px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        <VerificationError toggleModal={toggleModal} />
      </Dialog>
      <Dialog
        open={openModalVerifying}
        onClose={toggleModalVerifying}
        PaperProps={{
          sx: {
            maxWidth: '450px',
            width: '450px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        <Verifying toggleModal={toggleModalVerifying} />
      </Dialog>
    </>
  );
};
