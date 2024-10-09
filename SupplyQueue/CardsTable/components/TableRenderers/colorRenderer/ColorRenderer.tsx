import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Color } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface ColorRendererProps {
  colors: Maybe<Maybe<Color>[]>;
}

export const WrapperColor = styled.div<{
  bgColor?: Maybe<string>;
  width: string;
  height: string;
  border?: string;
  ml?: string;
}>`
  position: relative;
  border-radius: 50%;

  ${({ bgColor, width, height, border, ml }) => css`
    background-color: ${bgColor};
    width: ${width};
    height: ${height};
    min-width: ${width};
    min-height: ${height};
    border: ${border};

    :not(:first-of-type) {
      margin-left: ${ml || '-10px'};
    }
  `};
`;
export const ColorRenderer: FC<ColorRendererProps> = memo(({ colors }) => {
  const filteredColors = colors?.filter(f => f?.name !== 'unknown color');
  return (
    <FlexDir width='100%' alignItems='center' gap='8px'>
      <FlexDir>
        {filteredColors
          ?.slice(0, 4)
          .map((m, index) => (
            <WrapperColor
              key={index}
              bgColor={m?.hex}
              width='24px'
              height='24px'
              border='2px solid #f1f1f6'
              ml='-7px'
            />
          ))}
      </FlexDir>
      {colors && colors?.length - 4 > 0 && (
        <Text fontSize='12px' color='#7F80AA'>
          (+{colors?.length - 4})
        </Text>
      )}
    </FlexDir>
  );
});
