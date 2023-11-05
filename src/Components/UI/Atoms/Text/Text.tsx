import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { Colors } from '@Theme';

type TextType = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7';

const LARGE_LINE_HEIGHT = 36;
const MEDIUM_LINE_HEIGHT = 32;
const DEFAULT_LINE_HEIGHT = 22;
const SMALL_LINE_HEIGHT = 18;

const H1_FONT_SIZE = 32;
const H2_FONT_SIZE = 24;
const H3_FONT_SIZE = 22;
const H4_FONT_SIZE = 20;
const H5_FONT_SIZE = 18;
const DEFAULT_FONT_SIZE = 16;
const H7_FONT_SIZE = 14;

export type TextProps = RNTextProps & { [key in TextType]?: boolean } & {
  text?: string | number;
  align?: boolean;
  secondary?: boolean;
  light?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  bold?: boolean;
};

export function Text(props: TextProps) {
  // prettier-ignore
  const HeightStyle = props.H1 ? styles.H1
    : props.H2 ? styles.H2
      : props.H3 ? styles.H3
        : props.H4 ? styles.H4
          : props.H5 ? styles.H5
            : props.H7 ? styles.H7
              : styles.H6;

  // prettier-ignore
  const ColorStyle = props.secondary ? Colors.secondary
    : props.light ? Colors.light
      : Colors.primary;

  return (
    <RNText
      {...props}
      style={[
        {
          color: ColorStyle,
          ...HeightStyle,
          ...(props.align && { lineHeight: HeightStyle.fontSize }),
        },
        props.style,
      ]}>
      {props.text ?? props.children}
    </RNText>
  );
}

type Styles = Pick<TextStyle, 'fontSize' | 'lineHeight'>;

const styles = StyleSheet.create<{ [key in TextType]: { [P in keyof Styles]-?: Styles[P] } }>({
  H1: { fontSize: H1_FONT_SIZE, lineHeight: LARGE_LINE_HEIGHT },
  H2: { fontSize: H2_FONT_SIZE, lineHeight: MEDIUM_LINE_HEIGHT },
  H3: { fontSize: H3_FONT_SIZE, lineHeight: MEDIUM_LINE_HEIGHT },
  H4: { fontSize: H4_FONT_SIZE, lineHeight: DEFAULT_LINE_HEIGHT },
  H5: { fontSize: H5_FONT_SIZE, lineHeight: DEFAULT_LINE_HEIGHT },
  H6: { fontSize: DEFAULT_FONT_SIZE, lineHeight: DEFAULT_LINE_HEIGHT },
  H7: { fontSize: H7_FONT_SIZE, lineHeight: SMALL_LINE_HEIGHT },
});
