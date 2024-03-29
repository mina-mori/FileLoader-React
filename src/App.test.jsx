/* eslint-disable testing-library/prefer-screen-queries */
// App.test.js
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders TxtFileLoader component', () => {
    const { getByTestId } = render(<App />);
    const txtFileLoaderElement = getByTestId('txt-file-loader');
    expect(txtFileLoaderElement).toBeInTheDocument();
  });
});
