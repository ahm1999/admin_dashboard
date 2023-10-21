import { useState } from "react"
import ProductsForm from "./ProductsComponents/formProducts"
import ProductsAll from "./ProductsComponents/allProducts,"
import { ButtonGroup,Button } from "react-bootstrap";
/* o */
export default function Products() {
    const [currentPage,setCurrentPage] = useState(<ProductsAll/>)
    const formProducts  = () =>{
        setCurrentPage(<ProductsForm/>)
    }

    const allProducts = ()=>{
        setCurrentPage(<ProductsAll/>)
    }
   /*  setCurrentPage(<Routes> <Route path="/:productid" element={<><dir>productId</dir></>} /> </Routes>) */
    return(
        <div>
          <div className="hcenter">
            <ButtonGroup>
            <Button variant="secondary" onClick={formProducts}>add Products </Button>
            <Button variant="secondary" onClick ={allProducts}>all Products</Button>
            </ButtonGroup>
            </div>  
        
        <div>
        {currentPage}
        </div>
        
        </div>
        
    )
    
}