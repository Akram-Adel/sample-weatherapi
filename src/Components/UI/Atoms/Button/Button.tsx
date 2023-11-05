import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import _ from 'lodash';

import { Colors } from '@Theme';

import { Text, TextProps } from '../Text/Text';

export type ButtonProps = TouchableOpacityProps & { textProps?: TextProps; isLoading?: boolean };

export function Button(props: ButtonProps) {
  const [dots, setDots] = React.useState('.');

  React.useEffect(() => {
    const interval = !props.isLoading
      ? undefined
      : setInterval(() => {
          setDots((curDots) => (curDots.length >= 4 ? '.' : `${curDots}.`));
        }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [props.isLoading]);

  return (
    <TouchableOpacity
      disabled={props.disabled || props.isLoading}
      activeOpacity={0.4}
      {..._.omit(props, ['textProps', 'children'])}
      style={[
        styles.touchable,
        (props.isLoading || props.disabled) && styles.touchable_disabled,
        props.style,
      ]}>
      {props.isLoading ? (
        <Text style={styles.loading}>Loading{dots}</Text>
      ) : (
        <Text
          {...props.textProps}
          style={{ color: Colors.background, ...props.textProps }}
          children={props.children}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  touchable_disabled: { backgroundColor: Colors.light },
  loading: { color: Colors.background, width: 80 },
});
