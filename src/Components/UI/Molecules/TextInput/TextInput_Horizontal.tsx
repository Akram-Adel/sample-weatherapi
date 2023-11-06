import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';

import _ from 'lodash';

import { Colors } from '@Theme';

import { Text } from '../../Atoms';
import { TextProps } from '../../Atoms/Text/Text';

export type TextInputProps = RNTextInputProps & { labelProps?: TextProps; error?: boolean };

export function TextInputHorizontal(props: TextInputProps) {
  return (
    <View style={styles.container}>
      <Text {...props.labelProps}>City Name</Text>
      <RNTextInput
        {..._.omit(props, ['labelProps'])}
        style={[styles.textInput, props.error && styles.textInput_error, props.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, flexBasis: 0, flexDirection: 'row', alignItems: 'center' },
  textInput: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: Colors.white,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light,
    marginStart: 8,
    paddingHorizontal: 8,
  },
  textInput_error: { borderColor: Colors.secondary },
});
