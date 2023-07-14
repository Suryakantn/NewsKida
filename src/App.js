// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
const App = () => {
  const newsapikey = process.env.REACT_APP_NEW_API_KEY;
  const [progress, setprogress] = useState(0)
  let pageSize = 15;
  return (
    <div >
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<News newsapikey={newsapikey} setprogress={setprogress} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
            <Route exact path="/business" element={<News newsapikey={newsapikey} setprogress={setprogress} key='business' pageSize={pageSize} country='in' category='business' />}></Route>
            <Route exact path="/entertainment" element={<News newsapikey={newsapikey} setprogress={setprogress} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>
            <Route exact path="/general" element={<News newsapikey={newsapikey} setprogress={setprogress} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
            <Route exact path="/health" element={<News newsapikey={newsapikey} setprogress={setprogress} key='health' pageSize={pageSize} country='in' category='health' />}></Route>
            <Route exact path="/science" element={<News newsapikey={newsapikey} setprogress={setprogress} key='science' pageSize={pageSize} country='in' category='science' />}></Route>
            <Route exact path="/sports" element={<News newsapikey={newsapikey} setprogress={setprogress} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>
            <Route exact path="/technology" element={<News newsapikey={newsapikey} setprogress={setprogress} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>
          </Routes>

        </div>

      </Router>
    </div>
  )
}


export default App;
