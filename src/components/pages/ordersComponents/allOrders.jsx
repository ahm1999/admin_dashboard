import { useEffect, useState } from "react"
import SERVER_DOMAIN from "../server";
import PageNav from "../PageNav";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
export default function AllOrders(){

const [currentOrders,setCurrentOrders ]= useState([]) 
const [currentPage, setCurrentPage] = useState(0);
const [pageCount, setPageCount] = useState(1);
useEffect(()=>{
  const fetchData = async () => {
    let body = await fetch(
      SERVER_DOMAIN() + `/admin/orders/count`,
      {
        method: "GET", 
        headers: {
          authorization: `bearer ${localStorage.getItem("jwt token")}`,
          "Content-Type": "application/json",
        },
      }
    
    );
    let response = await body.json()
      /* console.log(response.data); */
  setPageCount((Math.ceil(response.data/ 10) * 10) / 10);}
  fetchData();
},[])
useEffect(()=>{
    const fetchData = async () => {
        let body = await fetch(
          SERVER_DOMAIN() + `/admin/orders/?pageno=${currentPage}`,
          {
            method: "GET", 
            headers: {
              authorization: `bearer ${localStorage.getItem("jwt token")}`,
              "Content-Type": "application/json",
            },
          }
        
        );
        let response = await body.json()
        /* console.log(response); */
        setCurrentOrders(response.data[0]);
        
}
fetchData();}
,[currentPage])    
return(<div>
  <Container><PrintOrders currentOrders= { currentOrders }/></Container>

<PageNav pageno={pageCount} setCurrentPage={setCurrentPage}/> 
</div>)

}
function PrintOrders (params){
    let currentOrders = JSON.stringify(params.currentOrders);
    currentOrders = JSON.parse(currentOrders)
    /* console.log(currentOrders); */
    return(
        currentOrders.map((order)=>{
            return(
            
            <Link to={`/orders/${order.OrdersId}`} key={order.OrdersId}>
              <Card>
                <Card.Body> <br />  
            user:{order.name}
            <br />
            email:{order.email}
            <br />
            created at:{order.OrdersCreatedAt}</Card.Body>
             
              </Card>
       
            </Link>)
        }))
        
       

}