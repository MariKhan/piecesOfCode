import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  width: 90%;
  max-width: 584px;
  height: auto;
  background: #fff;
  border-radius: 40px;
  transform: translate(-50%, -50%);
  align-items: center;
  z-index: 100;
`;
