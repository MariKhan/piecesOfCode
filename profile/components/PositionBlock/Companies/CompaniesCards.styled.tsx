import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.div<{ hasRemainQuantity?: boolean }>`
  position: relative;
  top: 2px;

  ${({ hasRemainQuantity }) =>
    hasRemainQuantity &&
    css`
      :not(:first-of-type) {
        margin-left: -10px;
      }
    `}
  :not(:last-child) {
    left: 10px;
  }

  Image {
    border: 2px solid #fff;
  }
`;
