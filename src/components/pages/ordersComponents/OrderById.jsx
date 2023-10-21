import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SERVER_DOMAIN from "../server";
export default function OrderById() {
  const { orderid } = useParams();
  const [productsInOrder, setProductsInOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let body = await fetch(SERVER_DOMAIN() + `/admin/orders/${orderid}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("jwt token")}`,
          "Content-Type": "application/json",
        },
      });
      const response = await body.json();
      setProductsInOrder(response.data[0]);
      //console.log(response);
    };
    fetchData();
  }, [orderid]);
  return (
    <div>
      <OrderData productsInOrder={productsInOrder} />
    </div>
  );
}

function OrderData(params) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (params.productsInOrder.length) {
      setUserName(params.productsInOrder[0].userName);
      setUserEmail(params.productsInOrder[0].userEmail);
    }
  }, [params.productsInOrder]);

  return (
    <>
      <div className="center" >
        <div className="card" style={{ padding:"5%"}}>
        <h3>User name :{userName}</h3>
        <h3>User email :{userEmail}</h3>
        {params.productsInOrder.map((element, index) => {
          return (
            <div key={index}>
              <h4>name:{element.product_name}</h4>{" "}
              <h5>quantity :{element.quantity}</h5>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}
