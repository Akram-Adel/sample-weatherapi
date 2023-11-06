import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import moment from 'moment';

import { WeatherApi, WeatherResponse, APIGuard } from '@API';
import { RootStackRoute } from '@Navigation';
import { Colors } from '@Theme';

import { Button, Text } from '@Atoms';
import { TextInput } from '@Molecules';

import { ErrorBoundaryContext } from '../../../ErrorBoundry';

export function CityWeather() {
  const { params } = useRoute<RootStackRoute<'CityWeather'>>();
  const ErrorBoundary = React.useContext(ErrorBoundaryContext);

  const [city, setCity] = React.useState(params.city);

  const [requestState, setNetworkState] = React.useState({
    data: null as APIGuard<WeatherResponse.Forecast> | null,
    loading: false,
    error: false,
  });

  React.useEffect(() => {
    loadCityWeather();
  }, []);

  async function loadCityWeather() {
    try {
      setNetworkState((state) => ({ ...state, loading: true, error: false }));

      const weather = await WeatherApi.get<WeatherResponse.Forecast>('forecast.json', {
        params: { q: city, days: 1, aqi: 'no', alerts: 'no' },
      });

      setNetworkState({ data: weather.data, loading: false, error: false });
    } catch (e) {
      setNetworkState({ data: null, loading: false, error: true });
      ErrorBoundary?.handleError(new Error(`WeatherApi network error: ${e}`));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <TextInput.Horizontal value={city} onChangeText={setCity} placeholder={'Enter City Name'} />

        <Button style={styles.buttonGap} isLoading={requestState.loading} onPress={loadCityWeather}>
          Search
        </Button>
      </View>

      {requestState.data ? (
        <>
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeader} H4>
              Location
            </Text>
          </View>

          <View style={[styles.column, styles.sectionSpacing]}>
            <Text style={styles.cell}>{requestState.data.location?.country}</Text>
            <Text style={styles.cell}>{requestState.data.location?.name}</Text>
          </View>

          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeader} H4>
              Current Condition
            </Text>
          </View>

          <View style={[styles.column, styles.sectionSpacing]}>
            <Text style={styles.cell}>{requestState.data.current?.temp_c} C</Text>

            <View style={[styles.cell, styles.cellImage]}>
              {requestState.data.current?.condition?.icon && (
                <Image
                  source={{ uri: `https:${requestState.data.current.condition.icon}` }}
                  width={40}
                  height={40}
                />
              )}

              <Text>{requestState.data.current?.condition?.text}</Text>
            </View>
          </View>

          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeader} H4>
              Next 5 hours forecast
            </Text>
          </View>

          {requestState.data.forecast?.forecastday?.[0].hour
            ?.filter((hour) => moment(hour.time).isBetween(moment(), moment().add(5, 'h'), 'h', '(]'))
            ?.map((hour, index) => (
              <View style={[styles.column, !index && styles.sectionSpacing]}>
                <Text style={styles.cell}>{moment(hour.time).format('hh:mm a')}</Text>
                <Text style={styles.cell}>{hour.temp_c} C</Text>

                <View style={[styles.cell, styles.cellImage, styles.cellLarge]}>
                  {hour.condition?.icon && (
                    <Image source={{ uri: `https:${hour.condition.icon}` }} width={40} height={40} />
                  )}

                  <Text>{hour.condition?.text}</Text>
                </View>
              </View>
            ))}
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 18, paddingVertical: 20 },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonGap: { marginStart: 8 },
  sectionSpacing: { marginTop: 20 },
  sectionHeader: { textAlign: 'center' },
  column: { flexDirection: 'row', alignItems: 'center' },
  cell: {
    flexGrow: 1,
    flexBasis: 0,
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  cellImage: { flexDirection: 'row', alignItems: 'center' },
  cellLarge: { flexGrow: 2 },
});
