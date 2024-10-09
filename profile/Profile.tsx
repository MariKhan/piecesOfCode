import { useEffect, useState } from 'react';
import { FlexDir } from 'app/styled-components/styles';
import { useGetUserProfileDataQuery } from 'app/store/features/profile/profile.api';
import { UserProfileInfoDto } from '@/types/userServiceTypes';
import { Spinner } from 'app/components/ui/Spinners';
import { ProfileHeader } from './components';
import { ProfileInformation } from './components/InformationBlock';
import { ProfilePosition } from './components/PositionBlock';

export const Profile = () => {
  const [userProfileData, setUserProfileData] = useState<UserProfileInfoDto>({
    id: 0,
    firstName: '',
    lastName: '',
    createdAt: '',
    birthDate: '',
    country: '',
    phone: '',
    email: '',
    status: 'CONFIRMED' || 'NOT_CONFIRMED' || 'UNDER_REVIEW' || 'REJECTED',
    avatarLink: '',
    role: 'USER' || 'ADMIN' || 'SUPPORT' || 'REFERRAL',
  });

  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    refetch: refetchProfileData,
  } = useGetUserProfileDataQuery('');

  const [isEdit, setIsEdit] = useState(false);
  const [editOnlyPhoto, setEditOnlyPhoto] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUserProfileData({
        id: profileData.id,
        role: profileData.role,
        status: profileData.status,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthDate: profileData.birthDate,
        country: profileData.country,
        phone: profileData.phone,
        email: profileData.email,
        avatarLink: profileData.avatarLink,
        createdAt: profileData.createdAt,
      });
    }
  }, [profileData]);

  const updateUserProfileDataFields = (fields: Partial<UserProfileInfoDto>) => {
    setUserProfileData((prev: UserProfileInfoDto) => ({
      ...prev,
      ...fields,
    }));
  };
  return (
    <>
      {profileData ? (
        <>
          <ProfileHeader
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            userProfileData={userProfileData}
            profileData={profileData}
            setEditOnlyPhoto={setEditOnlyPhoto}
          />
          <FlexDir gap='20px'>
            <ProfileInformation
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              editOnlyPhoto={editOnlyPhoto}
              userProfileData={userProfileData}
              setUserProfileData={setUserProfileData}
              updateUserProfileDataFields={updateUserProfileDataFields}
              profileData={profileData}
              isProfileDataLoading={isProfileDataLoading}
              refetchProfileData={refetchProfileData}
            />
            <ProfilePosition />
          </FlexDir>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
