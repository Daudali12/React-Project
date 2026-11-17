const apiBaseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:8000')
    .replace(/\/+$/, '');

export const blogsUrl = `${apiBaseUrl}/blogs`;
export const blogUrl = (id) => `${blogsUrl}/${encodeURIComponent(id)}`;
