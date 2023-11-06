import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootStackNavigation } from '@Navigation';

import { Button } from '@Atoms';
import { TextInput } from '@Molecules';

export function CityInfo() {
  const navigation = useNavigation<RootStackNavigation<'CityInfo'>>();

  const [city, setCity] = React.useState<string | undefined>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (city && error) setError(false);
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder={'Enter City Name'}
        style={styles.textInput}
        error={error}
      />

      <Button
        style={styles.button}
        onPress={() => {
          if (city) navigation.navigate('CityWeather', { city });
          else setError(true);
        }}>
        Search
      </Button>
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
