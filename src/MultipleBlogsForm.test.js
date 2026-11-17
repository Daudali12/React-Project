import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MultipleBlogsForm from './MultipleBlogsForm';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test('adds multiple blog rows and submits each one', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 201 });

  render(
    <MemoryRouter>
      <MultipleBlogsForm />
    </MemoryRouter>
  );

  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

  fireEvent.change(screen.getByRole('textbox', { name: 'Blog title 1' }), {
    target: { value: 'First blog' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Blog body 1' }), {
    target: { value: 'First body' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Add blog after row 1' }));

  fireEvent.change(screen.getByRole('textbox', { name: 'Blog title 2' }), {
    target: { value: 'Second blog' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Blog body 2' }), {
    target: { value: 'Second body' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  expect(JSON.parse(global.fetch.mock.calls[0][1].body)).toMatchObject({
    title: 'First blog',
    body: 'First body',
    author: 'Dawood',
  });
  expect(JSON.parse(global.fetch.mock.calls[1][1].body)).toMatchObject({
    title: 'Second blog',
    body: 'Second body',
    author: 'Dawood',
  });
});
