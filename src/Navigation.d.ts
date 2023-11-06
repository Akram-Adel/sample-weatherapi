import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  CityInfo: undefined;
  CityWeather: { city: string };
};

// prettier-ignore
export type RootStackNavigation<
  T extends keyof RootStackParamList
> = NativeStackNavigationProp<RootStackParamList, T>;

// prettier-ignore
export type RootStackRoute<
  T extends keyof RootStackParamList
> = RouteProp<RootStackParamList, T>
