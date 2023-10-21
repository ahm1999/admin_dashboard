import { useParams } from "react-router-dom";
import SERVER_DOMAIN from "../server";
import { useState, useEffect } from "react";
export default function ProductById() {
  const [productData, setProductData] = useState({});
  const { productid } = useParams();
  const [changed,setChanged] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      let body = await fetch(SERVER_DOMAIN() + `/prods/${productid}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("jwt token")}`,
          "Content-Type": "application/json",
        },
      });
      const response = await body.json();
      /*  setProductsInOrder(response.data[0]); */
      setProductData(response.data.name);
      //console.log(productData);
    };
    fetchData();
  }, [productid,changed]);

  return <ProductData changed ={changed} setChanged={setChanged} productData={productData} productid={productid} />;
}

function ProductData(params) {
  const [formName, setformName] = useState("");
  const [inStorage, setinStorage] = useState(0);
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState(0);

  let reqBody = JSON.stringify({
    name: formName,
    inStorage: inStorage,
    description: description,
    price: price,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    let body = await fetch(SERVER_DOMAIN() + `/prods/${params.productid}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("jwt token")}`,
        "Content-Type": "application/json",
      },
      body: reqBody,
    });
    const response = await body.json();
    console.log(response);
    params.setChanged(params.changed +1)
  };

  const nameHandler = (e) => {
    setformName(e.target.value);
  };
  const inStorageHandler = (e) => {
    setinStorage(e.target.value);
  };
  const descriptionHandler = (e) => {
    setdescription(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="center">
      <div className="card" style={{padding: "0.5rem"}}>
        <h4>Product name: {params.productData.name} </h4>
        <h5>price : {params.productData.price}</h5>
        <h5>In storage: {params.productData.inStorage}</h5>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">name</label>
          <input className="form-control" onChange={nameHandler} type="text" name="name" />
          <br />
          <label htmlFor="inStorage">In Storage quantity</label>
          <input className="form-control" onChange={inStorageHandler} type="number" name="inStorage" />
          <br />
          <label htmlFor="description">description</label>
          <input className="form-control"onChange={descriptionHandler} type="text" name="description" />
          <br />
          <label htmlFor="price">price</label>
          <input className="form-control"onChange={priceHandler} type="number" name="price" />
          <br />
          <button className="btn btn-primary" type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
