import { FC, useState } from 'react';
import { ImageHoverStyled, ImageStyled } from './Profile.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import SuccessIcon from '../../../../../public/static/newIcons/profile/Success.svg';
import SellerIcon from '../../../../../public/static/newIcons/profile/Seller.svg';
import { useTranslations } from 'next-intl';
import { AvatarForm } from 'app/components/ui/ImageUploading/AvatarUpload/AvatarForm';
import { UserProfileInfoDto } from '@/types/userServiceTypes';

import { ProfileBasicInformation } from 'app/view/profile/components/InformationBlock/ ProfileBasicInformation';
import { ProfileStatus } from 'app/view/profile/components/InformationBlock/ProfileStatus';
import { fromUTC } from 'app/utils/timeFormatted';
import { format } from 'date-fns';

interface ProfileInformationProps {
  userProfileData: UserProfileInfoDto;
  setUserProfileData: (data: UserProfileInfoDto) => void;
  isEdit: boolean;
  editOnlyPhoto: boolean;
  setIsEdit: (value: boolean) => void;
  updateUserProfileDataFields: (fields: Partial<UserProfileInfoDto>) => void;
  profileData: UserProfileInfoDto;
  isProfileDataLoading: boolean;
  refetchProfileData: () => void;
}

export const ProfileInformation: FC<ProfileInformationProps> = ({
  isEdit,
  userProfileData,
  updateUserProfileDataFields,
  profileData,
  isProfileDataLoading,
  refetchProfileData,

  editOnlyPhoto,
}) => {
  const tProfile = useTranslations('profile');
  const tCommon = useTranslations('common');
  const tTables = useTranslations('tableColumnNames');
  const tMain = useTranslations('main');

  const [avatar, setAvatar] = useState<string>('');

  return (
    <FlexDir
      bgColor='#fff'
      padding='40px'
      borderRadius='24px'
      style={{ flex: '2' }}
      dir='column'
      gap='24px'
      height='85vh'>
      <FlexDir alignItems='center' gap='24px'>
        {isEdit ? (
          <ImageHoverStyled onClick={() => setAvatar('avatarForm')} isEdit={isEdit}>
            <ImageStyled
              src={profileData?.avatarLink || ''}
              width={140}
              height={140}
              alt={tCommon('common_companyAvatarImage')}
            />
          </ImageHoverStyled>
        ) : (
          <ImageStyled
            src={profileData?.avatarLink || ''}
            alt={tCommon('common_companyAvatarImage')}
            width={140}
            height={140}
          />
        )}
        {avatar === 'avatarForm' && (
          <AvatarForm
            isInfoLoading={isProfileDataLoading}
            refetchInfo={refetchProfileData}
            setAvatar={setAvatar}
            entityType='profile'
          />
        )}

        <FlexDir dir='column' gap='16px'>
          <FlexDir alignItems='center'>
            <Text fontSize='32px' lineHeight='36px' fontWeight={600} mr='16px'>
              {profileData?.firstName} {profileData?.lastName}
            </Text>

            {profileData?.status === 'CONFIRMED' && (
              <FlexDir
                bgColor='#46BC44'
                borderRadius='28px'
                padding='4px 10px 4px 4px'
                height='24px'
                gap='4px'
                mr='12px'>
                <SuccessIcon />
                <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#fff'>
                  {tProfile('profile_verified')}
                </Text>
              </FlexDir>
            )}
            <FlexDir bgColor='#F1F1F6' borderRadius='28px' padding='4px 10px 4px 4px' height='24px' gap='4px'>
              <SellerIcon />
              <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#50528C'>
                {tTables('table_seller')}
              </Text>
            </FlexDir>
          </FlexDir>
          <FlexDir gap='10px' alignItems='center'>
            <FlexDir gap='8px'>
              <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#7F80AA'>
                {tMain('employees_employeeCardUniversal_date')}
              </Text>
              <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#50528C'>
                {profileData.createdAt ? format(new Date(fromUTC(profileData.createdAt)), 'dd.MM.yyyy') : '-'}
              </Text>
            </FlexDir>
          </FlexDir>

          <ProfileStatus profileData={profileData} />
        </FlexDir>
      </FlexDir>

      <ProfileBasicInformation
        userProfileData={userProfileData}
        updateUserProfileDataFields={updateUserProfileDataFields}
        editOnlyPhoto={editOnlyPhoto}
      />
    </FlexDir>
  );
};
