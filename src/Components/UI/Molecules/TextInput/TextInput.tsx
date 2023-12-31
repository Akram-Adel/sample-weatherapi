import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';

import _ from 'lodash';

import { Colors } from '@Theme';

import { Text } from '../../Atoms';
import { TextProps } from '../../Atoms/Text/Text';

import { TextInputHorizontal } from './TextInput_Horizontal';

export type TextInputProps = RNTextInputProps & { labelProps?: TextProps; error?: boolean };

export function TextInput(props: TextInputProps) {
  return (
    <View>
      <Text {...props.labelProps}>City Name</Text>
      <RNTextInput
        {..._.omit(props, ['labelProps'])}
        style={[styles.textInput, props.error && styles.textInput_error, props.style]}
      />
    </View>
  );
}

TextInput.Horizontal = TextInputHorizontal;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.white,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  textInput_error: { borderColor: Colors.secondary },
});
