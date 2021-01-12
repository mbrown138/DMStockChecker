import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
/**
  * @desc creates individual product cards for display
  * @param item object with data for individual product
  * @return jsx for product card
*/
function Product(props){
    let name = props.item.Name;
    name = name.replace('<br>', ' ');
    const soh = props.item.Products[0].Inventory.availableinventoryqty;
    const stockcode = props.item.Products[0].Stockcode;
    const singlePrice = props.item.Products[0].Prices.singleprice;
    let promoPrice;
    let casePrice;
  
    if (props.item.Products[0].Prices.hasOwnProperty('promoprice')){
      promoPrice = <ListGroupItem>Promo: {props.item.Products[0].Prices.promoprice.Value} {props.item.Products[0].Prices.promoprice.Message}</ListGroupItem>
    }
    if (props.item.Products[0].Prices.hasOwnProperty('caseprice')){
      casePrice = <ListGroupItem>Case: {props.item.Products[0].Prices.caseprice.Value} {props.item.Products[0].Prices.caseprice.Message}</ListGroupItem>
    }
  
    return(
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Stockcode: {stockcode}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Stock On Hand: {soh}</Card.Subtitle>
        </Card.Body>
        <ListGroup className="list-group-flush">
            {promoPrice}
            <ListGroupItem>Single: {singlePrice.Value} {singlePrice.Message}</ListGroupItem>
            {casePrice}
          </ListGroup>
      </Card>   
    )
  }

  export {Product};