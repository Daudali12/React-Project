import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogEditor = () => {
    const { id } = useParams();
    const history = useHistory();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Dawood');
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [blog]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setSaveError(null);

        try {
            const response = await fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body, author }),
            });
            if (!response.ok) {
                throw new Error('Could not update the blog. Please try again.');
            }
            history.push(`/blogs/${id}`);
        } catch (submitError) {
            setSaveError(
                submitError.message === 'Failed to fetch'
                    ? 'Cannot connect to the blog server. Run "npm run server" and try again.'
                    : submitError.message
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="create">
            <h2>Edit Blog</h2>
            {isPending && <div>Loading...</div>}
            {error && <div role="alert">{error}</div>}
            {blog && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="edit-blog-title">Blog Title:</label>
                    <input
                        id="edit-blog-title"
                        type="text"
                        required
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <label htmlFor="edit-blog-body">Blog Body:</label>
                    <textarea
                        id="edit-blog-body"
                        required
                        value={body}
                        onChange={event => setBody(event.target.value)}
                    />
                    <label htmlFor="edit-blog-author">Blog Author:</label>
                    <select
                        id="edit-blog-author"
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                    >
                        <option value="Dawood">Dawood</option>
                        <option value="Arham">Arham</option>
                    </select>
                    {saveError && <p role="alert">{saveError}</p>}
                    <button disabled={isSaving}>
                        {isSaving ? 'Updating...' : 'Update Blog'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default BlogEditor;
