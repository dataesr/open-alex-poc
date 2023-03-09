import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ConceptByYear from "./components/publication-by-concept";
import Network from "./components/network";
import Signatures from "./components/signatures";
import TopAuthors from "./components/top-authors";
import Layout from "./layout";
import load from "./load";
import HomePage from "./pages/home";
import ExplorePage from "./pages/explore";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="explore" element={<ExplorePage />} />
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
      const data = await load(
        "publication_year:2016-,raw_affiliation_string.search:beta cnrs"
      );
      setData(data);
    };
    getData();
  }, []);

  return (
    <div>
      <Network />
      <TopAuthors dataLoaded={data || []} />
      <ConceptByYear dataLoaded={data || []} />
      <Signatures filters={{ details: { affiliationOne: { type: "raw_affiliation_string", query: 'Paris Research Center' } } }} />
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
