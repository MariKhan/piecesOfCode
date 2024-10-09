import React, { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import SuccessfullyIcon from '../../../../../public/static/newIcons/profile/verification/Successfully.svg';
import VerifayingIcon from '../../../../../public/static/newIcons/profile/verification/Verifaying.svg';
import SuccessIcon from '../../../../../public/static/newIcons/profile/Success.svg';
import ClockIcon from '../../../../../public/static/newIcons/profile/verification/Time.svg';
import photo from '../../../../../public/static/newIcons/profile/verification/photoContent.png';
import { useTranslations } from 'next-intl';
import { IVerificationPageState } from 'app/utils/interfaces';
import InfoBlockOnlyRead from 'app/components/InfoBlockOnlyRead';
import Image from 'next/image';

interface VerificationSuccessfullyProps {
  userCredentialsData?: IVerificationPageState;
}

export const VerificationSuccessfully: FC<VerificationSuccessfullyProps> = ({ userCredentialsData }) => {
  const tProfile = useTranslations('profile');
  const tMain = useTranslations('main');
  const tAdmin = useTranslations('admin');
  const tCommon = useTranslations('common');

  return (
    <FlexDir dir='column' width='100%'>
      <FlexDir
        bgColor='#F9F9F9'
        height='100px'
        borderRadius='15px'
        padding='14px 24px'
        alignItems='center'
        justifyContent='space-between'
        mb='32px'>
        <FlexDir gap='12px' alignItems='center'>
          {userCredentialsData?.status === 'CONFIRMED' ? <SuccessfullyIcon /> : <VerifayingIcon />}

          <FlexDir dir='column'>
            <Text fontSize='20px' lineHeight='24px' fontWeight={600}>
              {tMain('main_verificationSuccessfullyCompleted')}
            </Text>
            <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
              {tProfile('profile_successfullyApproved')}
            </Text>
          </FlexDir>
        </FlexDir>
        {userCredentialsData?.status === 'CONFIRMED' ? (
          <FlexDir bgColor='#46BC44' borderRadius='28px' padding='4px 10px 4px 4px' height='24px' gap='4px' mr='12px'>
            <SuccessIcon />

            <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#fff'>
              {tProfile('profile_verified')}
            </Text>
          </FlexDir>
        ) : (
          <FlexDir justifyContent='space-between' bgColor='#7F80AA' borderRadius='12px' padding='8px 16px'>
            <ClockIcon style={{ marginRight: '8px' }} />
            <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#FFF' mr='25px'>
              {tMain('main_verificationPeriod')}
            </Text>
            <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#FFF'>
              {tMain('main_verificationPeriodHours')}
            </Text>
          </FlexDir>
        )}
      </FlexDir>
      <FlexDir gap='20px'>
        <FlexDir dir='column' width='50%' gap='4px'>
          <Text fontSize='20px' lineHeight='24px' fontWeight={600}>
            {tProfile('profile_personalInformation')}
          </Text>
          <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
            {tProfile('profile_fillFieldsWithPersonalData')}
          </Text>

          <FlexDir gap='12px' bgColor='#F9F9F9' padding='24px' mt='12px' borderRadius='16px' dir='column'>
            <InfoBlockOnlyRead
              title={tAdmin('admins_addAdminCard_firstName')}
              text={`${userCredentialsData?.firstName}`}
            />

            <InfoBlockOnlyRead
              title={tAdmin('admins_addAdminCard_lastName')}
              text={`${userCredentialsData?.lastName}`}
            />
            <InfoBlockOnlyRead title={tCommon('common_dateOfBirth')} text={`${userCredentialsData?.birthDate}`} />
            <InfoBlockOnlyRead title={tCommon('common_idCard')} text={`${userCredentialsData?.credentialNumber}`} />
          </FlexDir>
        </FlexDir>
        <FlexDir dir='column' width='50%' gap='4px'>
          <Text fontSize='20px' lineHeight='24px' fontWeight={600}>
            {tCommon('common_idCard')}
          </Text>
          <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
            {tMain('main_downloadDocumentHere')}
          </Text>
          <Image src={photo || ''} alt='id card' width={0} height={340} style={{ width: '100%', marginTop: '12px' }} />
        </FlexDir>
      </FlexDir>
    </FlexDir>
  );
};
