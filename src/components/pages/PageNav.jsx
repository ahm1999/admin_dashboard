import { Container, Pagination } from "react-bootstrap";
import "./pageNav.css"
export default function PageNav(params) {
    let arr = [];
    for (let i = 0; i < params.pageno; i++) {
      arr.push(
      
        <button className="paginateButton" key ={i}
        onClick={() => {
        params.setCurrentPage(i);
      }}
    ><Pagination.Item >
      {i + 1}
      </Pagination.Item>
    </button>

      
        
      );
    }
    return (
      <div className="hcenter">
      <Container >
      <Pagination > {arr}</Pagination>
      </Container>
      </div>
    );
  }