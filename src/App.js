
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetail from './BlogDetail';
import NotFound from './NotFound';
import MultipleBlogsForm from './MultipleBlogsForm';
import BlogEditor from './BlogEditor';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
             <Route path="/create">
              <Create/>
            </Route>
             <Route path="/addBulk2">
               <MultipleBlogsForm/>
             </Route>
             <Route path="/update/:id">
               <BlogEditor/>
             </Route>
            <Route path="/Blogs/:id">
              <BlogDetail/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
