import React from 'react';

import renderer from 'react-test-renderer';

import { Button } from '@Atoms';

import { cleanup, scheduleCleanup } from '../../../utils';

jest.useFakeTimers();

afterEach(cleanup);

describe('Button UI Atom', () => {
  it('clears active interval on unmount or isLoading prop change', async () => {
    jest.spyOn(global, 'clearInterval');
    scheduleCleanup((global.clearInterval as jest.Mock).mockRestore);

    await renderer.act(async () => {
      const component = await renderer.create(<Button />);
      await component.update(<Button isLoading />);
      await component.unmount();
    });

    expect(global.clearInterval).toHaveBeenCalledTimes(2);
  });
});
