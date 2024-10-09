import { useEffect, useState } from 'react';
import { useGetUserCredentialsQuery, useValidateProfileDataMutation } from 'app/store/features/profile/profile.api';
import { IVerificationPageState } from 'app/utils/interfaces';
import { FlexDir, Text } from 'app/styled-components/styles';
import InputFloatLabel from 'app/components/ui/Inputs/InputFloatLabel/InputFloatLabel';
import { useTranslations } from 'next-intl';
import { Button } from 'app/components/ui/NewButton';
import ArrowLeftIcon from '../../../../public/static/newIcons/profile/ArrowLeft.svg';
import { useRouter } from 'next/navigation';
import { VerificationDragDrow } from 'app/view/profile/Verification/VerificationDragDrow';
import { DatePicker } from 'app/components/DatePicker';
import { settingsPagePaths } from 'app/constants/pagePaths';
import { VerificationSuccessfully } from './components';
import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

export const Verification = () => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const tProfile = useTranslations('profile');

  const router = useRouter();
  const { data: userCredentialsData = {}, isLoading: userCredentialsDataIsLoading } = useGetUserCredentialsQuery('');

  const [verifyProfileData] = useValidateProfileDataMutation();
  const [ownerIdCardFile, setOwnerIdCardFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const [profileDataVerification, setProfileDataVerification] = useState<IVerificationPageState>({
    firstName: '',
    lastName: '',
    birthDate: '',
    credentialNumber: null,
    documentPhotoId: null,
  });

  useEffect(() => {
    if (userCredentialsData) {
      setProfileDataVerification({
        firstName: userCredentialsData.firstName,
        lastName: userCredentialsData.lastName,
        birthDate: userCredentialsData.birthDate ? new Date(userCredentialsData.birthDate) : '',
        credentialNumber: userCredentialsData.credentialNumber,
        documentPhotoId: userCredentialsData.passportFrontPhotoId,
      });
    }
  }, [userCredentialsData]);

  const updateProfileDataVerification = (fields: Partial<IVerificationPageState>) => {
    setProfileDataVerification(prev => ({
      ...prev,
      ...fields,
    }));
  };

  const handleSubmit = () => {
    setErrorInput(false);
    setError(false);
    if (!profileDataVerification.credentialNumber) {
      setErrorInput(true);
      return;
    }
    if (!profileDataVerification.documentPhotoId) {
      setError(true);
      return;
    }

    verifyProfileData(profileDataVerification)
      .unwrap()
      .then(() => {
        router.push(settingsPagePaths.PROFILE);
      });
  };

  return (
    <>
      <FlexDir justifyContent='space-between' alignItems='center' mb='20px'>
        <FlexDir alignItems='center' mr='12px' onClick={() => router.back()}>
          <ArrowLeftIcon />
          <Text fontSize='24px' lineHeight='30px' fontWeight={500}>
            {tMain('main_verification')}
          </Text>
        </FlexDir>
        <FlexDir>
          {(userCredentialsData?.status === 'NOT_CONFIRMED' || userCredentialsData?.status === 'REJECTED') && (
            <Button size='medium' onClick={handleSubmit}>
              {tProfile('profile_sendApplication')}
            </Button>
          )}
        </FlexDir>
      </FlexDir>
      {userCredentialsDataIsLoading ? (
        <Box sx={{ padding: '20px' }}>
          <Skeleton variant='rectangular' width='100%' height={100} sx={{ mb: 2 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='text' width='50%' height={50} />
              <Skeleton variant='rectangular' width='100%' height={300} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='text' width='50%' height={50} />
              <Skeleton variant='rectangular' width='100%' height={300} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <FlexDir bgColor='#fff' padding='40px' borderRadius='24px' height='85vh' gap='32px'>
          {userCredentialsData?.status === 'NOT_CONFIRMED' || userCredentialsData?.status === 'REJECTED' ? (
            <>
              <FlexDir dir='column' width='50%'>
                <Text fontSize='20px' lineHeight='24px' fontWeight={500} mb='4px'>
                  {tProfile('profile_personalInformation')}
                </Text>
                <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA' mb='16px'>
                  {tProfile('profile_fillFieldsWithPersonalData')}
                </Text>
                <FlexDir gap='16px' dir='column'>
                  <InputFloatLabel
                    label={tAdmin('admins_addAdminCard_firstName')}
                    value={profileDataVerification.firstName}
                    onChange={e => updateProfileDataVerification({ firstName: e.target.value })}
                  />
                  <InputFloatLabel
                    label={tAdmin('admins_addAdminCard_lastName')}
                    value={profileDataVerification.lastName}
                    onChange={e => updateProfileDataVerification({ lastName: e.target.value })}
                  />
                  <DatePicker
                    placeholder={tCommon('common_dateOfBirth')}
                    value={profileDataVerification.birthDate ? new Date(profileDataVerification.birthDate) : undefined}
                    onChange={newValue => updateProfileDataVerification({ birthDate: newValue })}
                  />
                  <InputFloatLabel
                    errorLabel={errorInput && !profileDataVerification.credentialNumber ? 'Obligatory' : ''}
                    labelColor={errorInput && !profileDataVerification.credentialNumber ? '#db2323' : ''}
                    border={
                      errorInput && !profileDataVerification?.credentialNumber
                        ? '1px solid #db2323'
                        : '1px solid #EAEAEF'
                    }
                    label={tCommon('common_idCard')}
                    value={profileDataVerification.credentialNumber || ''}
                    onChange={e =>
                      updateProfileDataVerification({
                        credentialNumber: e.target.value ? String(e.target.value) : null,
                      })
                    }
                  />
                </FlexDir>
              </FlexDir>
              <VerificationDragDrow
                updateProfileDataVerification={updateProfileDataVerification}
                file={ownerIdCardFile}
                setFile={setOwnerIdCardFile}
                error={error}
              />
            </>
          ) : (
            <VerificationSuccessfully userCredentialsData={userCredentialsData} />
          )}
        </FlexDir>
      )}
    </>
  );
};
