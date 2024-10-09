import { FlexDir, Text } from 'app/styled-components/styles';
import InputFloatLabel from 'app/components/ui/Inputs/InputFloatLabel/InputFloatLabel';
import { UserProfileInfoDto } from '@/types/userServiceTypes';
import { useTranslations } from 'next-intl';

interface ProfileBasicInformationProps {
  userProfileData: UserProfileInfoDto;
  updateUserProfileDataFields: (fields: Partial<UserProfileInfoDto>) => void;
  editOnlyPhoto: boolean;
}

export const ProfileBasicInformation = ({
  userProfileData,
  updateUserProfileDataFields,
  editOnlyPhoto,
}: ProfileBasicInformationProps) => {
  const tProfile = useTranslations('profile');
  const tAdmin = useTranslations('admin');
  const tMain = useTranslations('main');

  return (
    <FlexDir dir='column' gap='16px'>
      <Text fontSize='17px' lineHeight='24px' fontWeight={500}>
        {tProfile('profile_basicInformation')}
      </Text>
      <FlexDir gap='16px' dir='column'>
        <InputFloatLabel
          label={tAdmin('admins_addAdminCard_firstName')}
          value={userProfileData.firstName}
          onChange={e => updateUserProfileDataFields({ firstName: e.target.value })}
          disabled={!editOnlyPhoto}
        />
        <InputFloatLabel
          label={tAdmin('admins_addAdminCard_lastName')}
          value={userProfileData.lastName}
          onChange={e => updateUserProfileDataFields({ lastName: e.target.value })}
          disabled={!editOnlyPhoto}
        />

        <InputFloatLabel label={tMain('companyInfoContactsBlock_email')} value={userProfileData.email} disabled />
      </FlexDir>
    </FlexDir>
  );
};
