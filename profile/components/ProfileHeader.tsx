import { FlexDir, Text } from 'app/styled-components/styles';
import { Button } from 'app/components/ui/NewButton';
import EditIcon from '../../../../public/static/newIcons/profile/Edit.svg';
import { useEditUserProfileDataMutation } from 'app/store/features/profile/profile.api';
import { UserProfileInfoDto } from '@/types/userServiceTypes';
import { useTranslations } from 'next-intl';

interface ProfileHeaderProps {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  userProfileData: UserProfileInfoDto;
  profileData: UserProfileInfoDto;
  setEditOnlyPhoto: (value: boolean) => void;
}

export const ProfileHeader = ({
  isEdit,
  setIsEdit,
  userProfileData,
  profileData,
  setEditOnlyPhoto,
}: ProfileHeaderProps) => {
  const tProfile = useTranslations('profile');
  const tCommon = useTranslations('common');

  const [editUserProfileData] = useEditUserProfileDataMutation();

  const handleSaveClick = () => {
    if (profileData.status === 'CONFIRMED' || profileData.status === 'UNDER_REVIEW') {
      setIsEdit(false);
      setEditOnlyPhoto(false);
    } else editUserProfileData(userProfileData);
    setIsEdit(false);
    setEditOnlyPhoto(false);
  };
  const handleEditClick = () => {
    if (profileData.status === 'NOT_CONFIRMED' || profileData.status === 'REJECTED') {
      setIsEdit(true);
      setEditOnlyPhoto(true);
    } else if (profileData.status === 'CONFIRMED' || profileData.status === 'UNDER_REVIEW') {
      setIsEdit(true);
      setEditOnlyPhoto(false);
    }
  };
  return (
    <FlexDir justifyContent='space-between' alignItems='center' mb='20px'>
      <Text fontSize='24px' lineHeight='30px' fontWeight={500}>
        {tProfile('personalProfile')}
      </Text>
      <FlexDir>
        {!isEdit ? (
          <Button variant='tertiary' size='medium' onClick={handleEditClick}>
            <EditIcon /> {tProfile('editProfile')}
          </Button>
        ) : (
          <Button variant='tertiary' size='medium' iconPosition='right' onClick={handleSaveClick}>
            {tCommon('common_save')}
            <EditIcon />
          </Button>
        )}
      </FlexDir>
    </FlexDir>
  );
};
