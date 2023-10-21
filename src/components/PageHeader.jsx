import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
function PageHeader(params) {
  const navigate = useNavigate();
  const logOutHandler = () => {
    params.setLoggedin({ loggedin: false });
    localStorage.removeItem("jwt token");
    navigate("/");
  };

  return (
    <Navbar>
      <Container className="navbar">
        <Navbar.Brand><Link to="/">Admin Page</Link></Navbar.Brand>
        <Nav className="ml-auto">
          
            <Nav.Link>
            <Link to="/">home</Link>
            </Nav.Link>
            
          
          
            <Nav.Link>
            <Link to="/orders">orders</Link>
            </Nav.Link>
            
          

          <Nav.Link>
          <Link to="/products">products</Link>
          </Nav.Link>
            
          <Button className=" float-right" onClick={logOutHandler}>Log out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default PageHeader;
