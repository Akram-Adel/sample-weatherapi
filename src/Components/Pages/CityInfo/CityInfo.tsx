import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@Atoms';
import { TextInput } from '@Molecules';

export function CityInfo() {
  const [city, setCity] = React.useState<string | undefined>();

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder={'Enter City Name'}
        style={styles.textInput}
      />

      <Button style={styles.button}>Search</Button>
      <View style={styles.bottomGap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textInput: { minWidth: '60%' },
  button: { marginTop: 20 },
  bottomGap: { height: 50 },
});
