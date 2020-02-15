import 'react-native';
import React from 'react';
import { render, shallow } from 'react-native-testing-library';
import Root from '../Root';
import useAuth from '../Hooks/useAuth';

jest.mock('../Hooks/useAuth');

it('should show indicator loading', async () => {
  useAuth.mockReturnValue({ isLoading: true, isLoggedIn: false });
  const { getByTestId } = render(<Root />);
  const { output: paperProvider } = shallow(getByTestId('paperProvider'));
  expect(paperProvider).toMatchSnapshot();
});

it('should show screens', async () => {
  useAuth.mockReturnValue({ isLoading: false, isLoggedIn: true });
  const { getByTestId } = render(<Root />);
  const { output: paperProvider } = shallow(getByTestId('paperProvider'));
  expect(paperProvider).toMatchSnapshot();
});
