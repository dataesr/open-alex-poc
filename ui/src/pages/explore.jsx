import { useEffect, useState } from "react";
import { Container, Row, Col } from "@dataesr/react-dsfr";
import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import loadData from "../utils/loadData";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";

export default function ExplorePage() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState("");

  console.log(filters);

  useEffect(() => {
    const getData = async () => {
      const data = await loadData(filters);
      console.log(data);
      setData(data);
    };
    if (filters) getData();
  }, [filters]);

  const onSetFiltersHandler = (f) => {
    console.log("my filters", f);
    setFilters(f);
  };
  return (
    <main>
      <Filters onSetFiltersHandler={onSetFiltersHandler} />
      <section>
        <Container>
          <Row>
            <Col>
              <PublicationByYear dataLoaded={data || []} />
            </Col>
            <Col>graph 2</Col>
          </Row>
          <Row>
            <Col>
              <TopRevues dataLoaded={data || []} />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
