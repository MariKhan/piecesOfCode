import styled from '@emotion/styled';
import Image from 'next/image';

export const ImageStyled = styled(Image)`
  border-radius: 64px;
  vertical-align: top;
  position: relative;
`;

export const ImageHoverStyled = styled.div<{ isEdit: boolean }>`
  position: relative;
  cursor: ${({ isEdit }) => (isEdit ? 'pointer' : 'default')};

  ${({ isEdit }) =>
    isEdit &&
    `
    &::after {
      content: url('/static/newIcons/profile/Camera.svg');
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 140px;
      height: 140px;
      background: rgba(30, 32, 87, 0.2);
      border-radius: 70px;
      z-index: 5;
    }
  `}
`;
