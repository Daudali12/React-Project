import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import BlogDetail from './BlogDetail';
import BlogEditor from './BlogEditor';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test('opens the edit form from a blog and saves its changes', async () => {
  const blog = {
    id: 5,
    title: 'Original title',
    body: 'Original body',
    author: 'Dawood',
  };
  global.fetch = jest.fn((url, options) => (
    options && options.method === 'PUT'
      ? Promise.resolve({ ok: true })
      : Promise.resolve({ ok: true, json: async () => blog })
  ));

  render(
    <MemoryRouter initialEntries={['/blogs/5']}>
      <Switch>
        <Route path="/blogs/:id">
          <BlogDetail />
        </Route>
        <Route path="/update/:id">
          <BlogEditor />
        </Route>
      </Switch>
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByRole('button', { name: 'Edit' }, { timeout: 3000 }));
  expect(
    await screen.findByDisplayValue('Original title', {}, { timeout: 3000 })
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Blog Title:'), {
    target: { value: 'Updated title' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Update Blog' }));

  await waitFor(() => {
    const updateCall = global.fetch.mock.calls.find(([, options]) => options.method === 'PUT');
    expect(updateCall).toBeDefined();
    expect(JSON.parse(updateCall[1].body).title).toBe('Updated title');
  });
});
