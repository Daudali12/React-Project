import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const createEmptyBlog = () => ({ title: '', body: '', author: 'Dawood' });

const MultipleBlogsForm = () => {
    const [blogs, setBlogs] = useState([createEmptyBlog()]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleInputChange = (index, field, value) => {
        setBlogs(currentBlogs => currentBlogs.map((blog, blogIndex) =>
            blogIndex === index ? { ...blog, [field]: value } : blog
        ));
    };

    const addBlog = (event, index) => {
        event.preventDefault();
        setBlogs(currentBlogs => [
            ...currentBlogs.slice(0, index + 1),
            createEmptyBlog(),
            ...currentBlogs.slice(index + 1),
        ]);
    };

    const removeBlog = (event, index) => {
        event.preventDefault();
        setBlogs(currentBlogs => currentBlogs.filter((_, blogIndex) => blogIndex !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const failedBlogs = [];
        let failureMessage = '';

        for (const blog of blogs) {
            try {
                const response = await fetch('http://localhost:8000/blogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog),
                });
                if (!response.ok) {
                    throw new Error(`Could not save "${blog.title}" (HTTP ${response.status}).`);
                }
            } catch (submitError) {
                failedBlogs.push(blog);
                failureMessage = submitError.message === 'Failed to fetch'
                    ? 'Cannot connect to the blog server. Run "npm run server" and try again.'
                    : submitError.message;
            }
        }

        if (failedBlogs.length > 0) {
            setBlogs(failedBlogs);
            setError(`${failedBlogs.length} blog(s) could not be saved. ${failureMessage}`);
            setIsPending(false);
            return;
        }

        setIsPending(false);
        history.push('/');
    };

    return (
        <div className="bulk-create">
            <h2>Add Multiple Blogs</h2>
            <form onSubmit={handleSubmit}>
                {blogs.map((blog, index) => (
                    <div className="bulk-row" key={index}>
                        <input
                            aria-label={`Blog title ${index + 1}`}
                            className="bulk-field"
                            placeholder={`Title ${index + 1}`}
                            required
                            value={blog.title}
                            onChange={event => handleInputChange(index, 'title', event.target.value)}
                        />
                        <textarea
                            aria-label={`Blog body ${index + 1}`}
                            className="bulk-field bulk-body"
                            placeholder={`Body ${index + 1}`}
                            required
                            value={blog.body}
                            onChange={event => handleInputChange(index, 'body', event.target.value)}
                        />
                        <button
                            type="button"
                            className="bulk-action"
                            aria-label={`Add blog after row ${index + 1}`}
                            onClick={event => addBlog(event, index)}
                        >
                            +
                        </button>
                        {blogs.length > 1 && (
                            <button
                                type="button"
                                className="bulk-action"
                                aria-label={`Remove blog row ${index + 1}`}
                                onClick={event => removeBlog(event, index)}
                            >
                                -
                            </button>
                        )}
                    </div>
                ))}
                {error && <p className="bulk-error" role="alert">{error}</p>}
                <button className="bulk-submit" disabled={isPending}>
                    {isPending ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default MultipleBlogsForm;
