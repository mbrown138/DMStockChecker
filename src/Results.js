import {Flexbox} from './styledElements';
import {Product} from './Product'
/**
  * @desc Results component, packs relevant objects into array from raw json
  * @param props.data product json object
  * @param props.storeName name of store
  * @return jsx of store name and results
*/
function Results(props){
    const data = props.data;
    const storeName = props.storeName;
  
    //Create array of elements for display
    let products = [];
    for (const attr in data.Products) {
      if ((data.Products[attr].Products[0].Inventory.availableinventoryqty > 0) && (data.Products[attr].Products[0].IsForCollection === true)){
        products.push(<Product item={data.Products[attr]}/>)  
      }    
    }
  
    return (
      <div>
        <h2>{storeName}</h2>
        <Flexbox>
          {products}
        </Flexbox>
      </div>
    )
   
  }
  
  export {Results};