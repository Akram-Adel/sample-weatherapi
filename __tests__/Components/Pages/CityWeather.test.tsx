import React from 'react';

import renderer from 'react-test-renderer';

import { WeatherApi } from '@API';

import { CityWeather } from '@Pages';

import { cleanup, scheduleCleanup } from '../../utils';

jest.useFakeTimers();

afterEach(cleanup);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockReturnValue({ error: null, handleError: jest.fn() }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn().mockReturnValue({ params: { city: '' } }),
}));

jest.mock('@API', () => ({
  ...jest.requireActual('@API'),
  WeatherApi: {
    get: jest.fn().mockResolvedValue({ data: {} }),
  },
}));

describe('CityWeather Page', () => {
  it('reports network error to the ErrorBoundary', async () => {
    const ErrorBoundary = React.useContext(null as unknown as React.Context<{ handleError: () => void }>);

    (WeatherApi.get as jest.Mock).mockRejectedValue(501);
    scheduleCleanup(() => (WeatherApi.get as jest.Mock).mockResolvedValue({ data: {} }));

    await renderer.act(async () => {
      await renderer.create(<CityWeather />);
    });

    expect(ErrorBoundary?.handleError).toHaveReturnedTimes(1);
  });
});
