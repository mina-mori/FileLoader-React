import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TxtFileLoader from './TxtFileLoader';

describe('TxtFileLoader component', () => {
  it('should display an error message for invalid file format', () => {
    render(<TxtFileLoader />);
    const input = screen.getByTestId('txt-file-input');

    fireEvent.change(input, {
      target: {
        files: [new File(['file content'], 'test.doc', { type: 'text/doc' })],
      },
    });

    const errorMessage = screen.getByText(
      'Error: Invalid file format. Only .txt files are allowed.'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display an error message for empty file', async () => {
    render(<TxtFileLoader />);
    const input = screen.getByTestId('txt-file-input');

    fireEvent.change(input, {
      target: {
        files: [new File([''], 'test.txt', { type: 'text/plain' })],
      },
    });
    await waitFor(() => {
      const errorMessage = screen.getByText('Error: File is empty.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display file content and word count', async () => {
    render(<TxtFileLoader />);
    const input = screen.getByTestId('txt-file-input');

    fireEvent.change(input, {
      target: {
        files: [
          new File(['Hello world. Hello JavaScript.'], 'test.txt', {
            type: 'text/plain',
          }),
        ],
      },
    });
    await waitFor(() => {
      const content = screen.getByTestId('file-content-heading');
      expect(content).toBeInTheDocument();
    });
    await waitFor(() => {
      const wordCount = screen.getByText('Word Count:');
      expect(wordCount).toBeInTheDocument();
    });
    await waitFor(() => {
      const wordHello = screen.getByText('Hello: 2');
      expect(wordHello).toBeInTheDocument();
    });
    await waitFor(() => {
      const wordJavaScript = screen.getByText('JavaScript.: 1');
      expect(wordJavaScript).toBeInTheDocument();
    });
  });
});
