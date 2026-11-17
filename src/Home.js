import { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');
    // const [blogs, setBlogs] = useState(null);
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null);
    const [name, setName] = useState('dawood');
    // const [blogs, setBlogs] = useState([
    //     {title: 'my new React website', body: 'Lorem ipsum....', author: 'Dawood', id: 1},
    //     {title: 'How to learn React', body: 'Lorem ipsum....', author: 'Arham', id: 2},
    //     {title: 'React Hooks Explained', body: 'Lorem ipsum....', author: 'Rahim', id: 3}
    // ]);

    // const [name, setName] = useState('dawood');
    // const [name, setName] = useState('dawood');
    // const [age, setAge] = useState(20);
    // // let name = 'dawood';
    // const handleClick = () => {
    //     setName('jamashah');
    //     setAge(30);
        // name = 'Daud';
        // console.log(name);
        // useEffect(() => { // useEffect is a hook that allow you to perform side effects in your componenet.
        //   setTimeout(() => {
        //      fetch('http://Localhost:8000/blogs')
        //    .then(res => {
        //     // console.log(res);
        //     if(!res.ok){
        //     throw Error('Could not fetch the data for that resource');
        //    }
        //     return  res.json();
        //    })
        //    .then(data => {
        //    setBlogs(data);
        //    setIsPending(false);
        //    setError(null);
        //    })
        //      .catch(err => {
        //         setIsPending(false);
        //         setError(err.message);
        //      })
        //      .finally(() => {
        //         setIsPending(false);
        //      });
        //    }, 1000);
        // }, []);
        //     setBlogs(data));
        //     console.log(name);
        // }, [name]);
       
    
    return ( 
        <div className="home">
            
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
             {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'Arham' )} title="Arham Blogs!" /> */}
            
            
            {/* <p>{name} is {age} years old.</p>
            <button onClick={handleClick}>Click Me</button>
            </div> */}
            {/* {blog.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                </div>

            ))} */}
             <button onClick={() => setName('jamashah')}>Change Name</button>
             <p>{name}</p>
            </div>
           
     );  
    }
    
 
export default Home;
