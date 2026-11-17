import {useState} from 'react';
import { useHistory } from 'react-router-dom';
const Create = () => {
    const [ title, setTitle] = useState('');
     const [ body, setBody] = useState('');
     const [ author, setAuthor] = useState('Dawood');
     const [isPending, setIsPending] = useState(false);
     const [submitError, setSubmitError] = useState(null);
     const history = useHistory();

     const handleSubmit = async (e) => {
       e.preventDefault();
       
       const blog = {title, body, author};
       setIsPending(true);
       setSubmitError(null);

       try {
        const response = await fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(blog)
        });
        if (!response.ok) {
            throw new Error('Could not save the blog. Please try again.');
        }
        history.push('/');
       } catch (error) {
        setSubmitError(
            error.message === 'Failed to fetch'
                ? 'Cannot connect to the blog server. Run "npm run server" and try again.'
                : error.message
        );
       } finally {
        setIsPending(false);
       }
     } 
    return ( 
        <div className="create">
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                type="text"
                required
                value={ title }
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea
                required 
                value={ body}
                onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <label>Blog author:</label>
                <select
                value={ author }
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Dawood">Dawood</option>
                     <option value="Arham">Arham</option>
                </select>
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding Blog...</button> }
                { submitError && <p role="alert">{ submitError }</p> }
            </form> 
        </div>
     );
}
 
export default Create;