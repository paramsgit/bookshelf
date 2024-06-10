import './App.css';
import Navbar from './Components/navbar';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import store from './utils/store';
import Container from './Components/container';
import Shelf from './Components/shelf';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [theme,settheme]=useState(true)
  const [query,setquery]=useState("")

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
  }, [theme])

  const router = createBrowserRouter([
    {
      path: "/",
      element:     <Navbar setquery={setquery} mode={[theme,settheme]}/>,
      children: [
        {
          path: "/",
          element: <Container query={query}/>,
        },
        {
          path: "/shelf",
          element: <Shelf />,
        },
      ],
    },
    
  ]);
  
  return (
    <Provider store={store} >
   
    <RouterProvider router={router} />
    
    </Provider>
  );
}



export default App;
