import { useEffect, useState } from "react";
import SERVER_DOMAIN from "../server";
import { Link/* , Route, Routes, useNavigate */ } from "react-router-dom";
import PageNav from "../PageNav";
import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import "./allProducts.css"

export default function ProductsAll() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let body = await fetch(
        SERVER_DOMAIN() + `/prods/?pageno=${currentPage}`,
        {
          method: "GET",
          headers: {
            authorization: `bearer ${localStorage.getItem("jwt token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      let response = await body.json();

      setPageCount((Math.ceil(response.data.count / 10) * 10) / 10);
      setCurrentProducts(response.data.rows);
      return response.data;
    };
    fetchData();
  }, [currentPage]);
  return (
    <>
    
     <Container d-flex justify-content-center ><ProductsPerPage products={currentProducts} /></Container> 
      <div >{<PageNav  pageno={pageCount} setCurrentPage={setCurrentPage} />}</div>
    </>
  );
}

function ProductsPerPage(params) {
  return( params.products.map((product) => {
          return(
            
            <div key={product.id}>
              <Card>
                <Card.Body>
              <Link to={`/${product.id}`} key={product.id} >
            
                id:{product.id}
                  <br />
                 name :{product.name}
               <br />
                 price:{product.price}    
               </Link>
               </Card.Body>
               </Card>
            </div>
            )
    })
  )
}
