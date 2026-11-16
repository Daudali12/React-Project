import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
const BlogDetail = () => {
    const { id } =useParams();
    const { data: blog, error, isPending } = useFetch('http://Localhost:8000/blogs/' + id)
    const histroy = useHistory();

    const handleClick = () => {
        fetch ('http://Localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            histroy.push('/');
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
            <button onClick={handleClick}>delete</button>
        </article>
       )}
      </div>
 );
}
 
export default BlogDetail;   