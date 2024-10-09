import React, { FC } from 'react';
import { ButtonStyled, ButtonWrapper } from './NewButton.styled';

export interface IButton {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative';
  size?: 'big' | 'medium' | 'small';
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  disabled?: boolean;
  outlined?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButton> = ({
  children,
  variant = 'primary',
  size = 'big',
  icon,
  disabled,
  outlined,
  iconPosition = 'left',
  isLoading,
  onClick,
}) => {
  const hasIcon = !!icon;


  return (
    <ButtonWrapper isLoading={isLoading} variant={variant} size={size}>
      <ButtonStyled
        variant={variant}
        size={size}
        disabled={disabled}
        outlined={outlined}
        isLoading={isLoading}
        onClick={onClick}
        hasIcon={hasIcon}>
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </ButtonStyled>
    </ButtonWrapper>
  );
};


