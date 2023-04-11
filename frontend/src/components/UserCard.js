import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard() {
  return (
    <Card style={{ width: '15rem',height:'5rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" style={{height:'10rem' }}/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Readmore</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;