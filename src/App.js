// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  newsapikey = process.env.REACT_APP_NEW_API_KEY;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }
  render() {
    let pageSize = 15;
    return (
      <div >
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
              <Route exact path="/business" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='business' pageSize={pageSize} country='in' category='business' />}></Route>
              <Route exact path="/entertainment" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>
              <Route exact path="/general" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
              <Route exact path="/health" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='health' pageSize={pageSize} country='in' category='health' />}></Route>
              <Route exact path="/science" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='science' pageSize={pageSize} country='in' category='science' />}></Route>
              <Route exact path="/sports" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>
              <Route exact path="/technology" element={<News newsapikey={this.newsapikey} setProgress={this.setProgress} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>
            </Routes>

          </div>

        </Router>
      </div>
    )
  }
}


// export default App;
