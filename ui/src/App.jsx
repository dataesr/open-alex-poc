import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import DisplayGraph from './components/network';
import PublicationByYear from './components/publication-by-year';
import TopRevues from './components/top-revues';
import Layout from './layout';
import load from './load';
import HomePage from './pages/home';

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="draft" element={<Draft />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Draft() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await load('publication_year:2016-,raw_affiliation_string.search:beta cnrs');
      // console.log(data);
      setData(data);
    }
    getData();
  }, []);

  return (
    <div>
      {/* <DisplayGraph /> */}
      <PublicationByYear />
      <TopRevues />
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}