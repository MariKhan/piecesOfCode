import styled from '@emotion/styled';
import { css } from '@emotion/react';

const variantColors: Record<
  string,
  {
    background: string;
    hoverBackground: string;
    activeBackground: string;
    text: string;
    hoverText: string;
    activeText: string;
    border: string;
    hoverBorder: string;
    activeBorder: string;
    textOutlined: string;
    hoverTextOutlined: string;
    activeTextOutlined: string;
  }
> = {
  primary: {
    background: '#50528C',
    hoverBackground: '#1E2057',
    activeBackground: '#14164D',
    text: '#fff',
    hoverText: '#fff',
    activeText: '#fff',
    textOutlined: '#50528C',
    hoverTextOutlined: '#1E2057',
    activeTextOutlined: '#14164D',
    border: '#50528C',
    hoverBorder: '#1E2057',
    activeBorder: '#14164D',
  },

  secondary: {
    background: '#FD6E08',
    hoverBackground: '#DC5F05',
    activeBackground: '#D2550A',
    text: '#fff',
    hoverText: '#fff',
    activeText: '#fff',
    textOutlined: '#FD6E08',
    hoverTextOutlined: '#DC5F05',
    activeTextOutlined: '#D2550A',
    border: '#FD6E08',
    hoverBorder: '#DC5F05',
    activeBorder: '#D2550A',
  },
  tertiary: {
    background: '#F1F1F6',
    hoverBackground: '#E0E0E5',
    activeBackground: '#D6D6DB',
    text: '#1E2057',
    hoverText: '#1E2057',
    activeText: '#1E2057',
    textOutlined: '#50528C',
    hoverTextOutlined: '#50528C',
    activeTextOutlined: '#50528C',
    border: '#F1F1F6',
    hoverBorder: '#E0E0E5',
    activeBorder: '#CCCCD1',
  },
  positive: {
    background: '#E4F2E3',
    hoverBackground: '#E1EFE1',
    activeBackground: '#E0EEE0',
    text: '#46BC44',
    hoverText: '#32A830',
    activeText: '#289E26',
    textOutlined: '#46BC44',
    hoverTextOutlined: '#32A830',
    activeTextOutlined: '#289E26',
    border: '#46BC44',
    hoverBorder: '#32A830',
    activeBorder: '#289E26',
  },
  negative: {
    background: 'rgba(219, 30, 54, 0.12)',
    hoverBackground: '#F3DCDF',
    activeBackground: '#E9D2D5',
    text: '#DB1E36',
    hoverText: '#C70A22',
    activeText: '#BD0018',
    textOutlined: '#DB1E36',
    hoverTextOutlined: '#C70A22',
    activeTextOutlined: '#BD0018',
    border: '#DB1E36',
    hoverBorder: '#C70A22',
    activeBorder: '#BD0018',
  },
};

const sizeStyles: Record<
  string,
  {
    fontSize: string;
    lineHeight: string;
    height: string;
    padding: string;
    fontWeight: number;
  }
> = {
  big: {
    fontSize: '16px',
    lineHeight: '24px',
    height: '60px',
    fontWeight: 500,
    padding: '10px 24px 10px 10px',
  },
  medium: {
    fontSize: '16px',
    lineHeight: '24px',
    height: '44px',
    fontWeight: 500,
    padding: '8px 24px 8px 8px',
  },
  small: {
    fontSize: '12px',
    lineHeight: '16px',
    height: '32px',
    fontWeight: 500,
    padding: '6px 24px 6px 6px',
  },
};

export const ButtonWrapper = styled.div<{
  isLoading?: boolean;
  size: string;
  variant: string;
}>`
  ${({ isLoading, variant, size }) => css`
    width: 100%;

    ${isLoading &&
    css`
      background: ${variantColors[variant]?.background};
      border-radius: 53px;
      position: relative;
      height: ${sizeStyles[size]?.height};
      overflow: hidden;

      &::before {
        content: '';
        background: ${variant === 'primary'
          ? 'conic-gradient(transparent 270deg, #FD6E08, transparent)'
          : variant === 'secondary'
          ? 'conic-gradient(transparent 270deg, #fff, transparent)'
          : 'initial'};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1;
        width: 100%;
        animation: rotate 2s linear infinite;
      }

      &::after {
        content: '';
        background: ${variantColors[variant]?.background};
        border-radius: inherit;
        position: absolute;
        inset: 3px;
      }
    `}
  `}
`;
export const ButtonStyled = styled.button<{
  variant: string;
  size: string;
  disabled?: boolean;
  outlined?: boolean;
  isLoading?: boolean;
  hasIcon?: boolean;
}>`
  display: flex;
  width: 100%;
  cursor: pointer;
  border-radius: 53px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 10px;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;

  ${({ variant, outlined }) => {
    const colors = variantColors[variant];
    if (!colors) return '';

    const {
      background,
      hoverBackground,
      activeBackground,
      text,
      hoverText,
      activeText,
      textOutlined,
      hoverTextOutlined,
      activeTextOutlined,
      border,
      hoverBorder,
      activeBorder,
    } = colors;

    return css`
      background-color: ${outlined ? 'transparent' : background};
      color: ${outlined ? textOutlined : text};
      border: ${outlined ? `1px solid ${border}` : 'none'};

      &:hover {
        background-color: ${outlined ? 'transparent' : hoverBackground};
        color: ${outlined ? hoverTextOutlined : hoverText};
        border: ${outlined ? `1px solid ${hoverBorder}` : 'none'};
      }

      &:active {
        background-color: ${outlined ? 'transparent' : activeBackground};
        color: ${outlined ? activeTextOutlined : activeText};
        border: ${outlined ? `1px solid ${activeBorder}` : 'none'};
      }
    `;
  }};

  ${({ size, hasIcon }) => {
    const styles = sizeStyles[size];
    if (!styles) return '';

    const { fontSize, lineHeight, height, fontWeight } = styles;
    const padding = hasIcon ? styles.padding : '0 24px';

    return css`
      font-size: ${fontSize};
      line-height: ${lineHeight};
      height: ${height};
      padding: ${padding};
      font-weight: ${fontWeight};
    `;
  }};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      background: transparent;
      position: relative;
      overflow: hidden;
      z-index: 10;
    `};

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
    }

    to {
      transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
    }
  }
`;
