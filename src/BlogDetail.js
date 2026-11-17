import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { blogUrl } from "./api";
const BlogDetail = () => {
    const { id } =useParams();
    const { data: blog, error, isPending } = useFetch(blogUrl(id))
    const history = useHistory();

    const handleClick = () => {
        fetch (blogUrl(blog.id), {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }
        return ( 
      <div className="blog-detail">
       { isPending && <div>Loading...</div> }
       { error && <div> { error }</div> }
       { blog && (
        <article>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
            <div>{ blog.body }</div>
            <div className="blog-actions">
                <button onClick={handleClick}>Delete</button>
                <button onClick={() => history.push(`/update/${id}`)}>Edit</button>
            </div>
        </article>
       )}
      </div>
 );
}
 
export default BlogDetail;   