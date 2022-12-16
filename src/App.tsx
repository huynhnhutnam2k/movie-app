import React, { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Main from './components/layout/Main';
import Catalog from './pages/Catalog';
import Header from './components/layout/Header';
// import HomePage from './pages/HomePage';
const HomePage = lazy(() => import('./pages/HomePage'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
function App() {
  return (
    <>
      <Suspense fallback={<></>} >
        <Header></Header>
        <Routes>
          <Route element={<Main></Main>} >
            <Route path='/' element={<HomePage></HomePage>}></Route>
          </Route>
          {/* <Route path="/movies" element={<MoviePage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetail />}></Route>
           */}
          <Route path='/:category' element={<Catalog />} />
          <Route path='/:category/:movieId' element={<MovieDetail />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
