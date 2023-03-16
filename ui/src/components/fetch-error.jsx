import { Container, Highlight } from '@dataesr/react-dsfr';

export default function FetchError() {
  return (
    <Container>
      <Highlight className="fr-my-15w">
        An error occured while fetching the data.
      </Highlight>
    </Container>
  );
}
