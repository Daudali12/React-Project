import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Create from './Create';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test('shows a helpful message when the blog server is unavailable', async () => {
  global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));

  const { container } = render(
    <MemoryRouter>
      <Create />
    </MemoryRouter>
  );

  expect(container.querySelectorAll('form > p')).toHaveLength(0);

  const [titleInput, bodyInput] = screen.getAllByRole('textbox');
  fireEvent.change(titleInput, { target: { value: 'A new blog' } });
  fireEvent.change(bodyInput, { target: { value: 'Blog body' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Blog' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Cannot connect to the blog server. Run "npm run server" and try again.'
  );
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Add Blog' })).toBeEnabled();
  });
});
