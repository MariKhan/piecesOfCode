import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Color } from 'app/api/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface ColorRendererProps {
  colors: (Maybe<Color> | undefined)[];
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
    <FlexDir width='100%'>
      <FlexDir bgColor='#EAEAEF' borderRadius='16px' padding='4px 10px 4px 6px'>
        {filteredColors?.length > 1 ? (
          <FlexDir alignItems='center' gap='6px'>
            <FlexDir>
              {filteredColors?.map((m, index) => (
                <WrapperColor
                  key={m?.hex}
                  bgColor={m?.hex}
                  width='24px'
                  height='24px'
                  border='2px solid #f1f1f6'
                  ml='-10px'
                />
              ))}
            </FlexDir>
            <Text color='#50528C' fontSize='14px'>
              {`${filteredColors[0]?.name}/${filteredColors[1]?.name}`}
            </Text>
          </FlexDir>
        ) : (
          <FlexDir alignItems='center' gap='6px'>
            {filteredColors.map((m, index) => (
              <WrapperColor
                key={index}
                bgColor={m?.hex}
                width='24px'
                height='24px'
                border='2px solid #f1f1f6'
                ml='-7px'
              />
            ))}
            <Text color='#50528C' fontSize='14px'>
              {filteredColors[0]?.name}
            </Text>
          </FlexDir>
        )}
      </FlexDir>
    </FlexDir>
  );
});
