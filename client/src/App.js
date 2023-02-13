import React, { createContext, useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Error from './components/Error'
import Logout from './components/Logout';
import { initialState, reducer } from './reducer/UseReducer';
import LoadingBar from 'react-top-loading-bar'

// Context API is used to share states between the components 
// useReducer Hook is used to store and update states
// if anything changes in dispatch then it will call the reducer function which has an action method in it, and with the help of that method we can change the value of the state
// The useContext is the React hook, used in context API to consume the context state or object.  There are two options for getting the context object. We can get the context object from Context Consumer or useContext Hook. UseContext Hook is an exquisite, more excellent way to get the context object with less code.

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [progress, setProgress] = useState(0)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <LoadingBar
          color='blue'
          height={3}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path='/' element={<Home setProgress={setProgress}/>} />
          <Route path='/about' element={<About setProgress={setProgress}/>} />
          <Route path='/contact' element={<Contact setProgress={setProgress}/>} />
          <Route path='/login' element={<Login setProgress={setProgress}/>} />
          <Route path='/signup' element={<Signup setProgress={setProgress}/>} />
          <Route path='/logout' element={<Logout setProgress={setProgress}/>} />
          <Route path='*' element={<Error setProgress={setProgress}/>} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App;