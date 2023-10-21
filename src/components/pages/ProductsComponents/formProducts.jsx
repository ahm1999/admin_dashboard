import {  useState } from "react"
import SERVER_DOMAIN from "../server"
export default function ProductsForm (){

    const [formName,setformName] = useState('')
    const [inStorage,setinStorage] = useState(0)
    const [description,setdescription] = useState('')
    const [imgUrl,setImgUrl] = useState('')
    const [price,setPrice] = useState(0)

    let reqBody = JSON.stringify({
        name:formName,
        inStorage:inStorage,
        description:description,
        imageUrl:imgUrl,
        price:price
    })
    const submitHandler = async e =>{
        e.preventDefault()


        let body = await fetch(SERVER_DOMAIN()+"/prods/admin/addProduct",{
            method: "POST", // or 'PUT'
             headers: {
            "authorization":`bearer ${localStorage.getItem("jwt token")}`,    
            "Content-Type": "application/json",
            } ,
            body:reqBody}
            )
        
        //let response =  await body.json()
       console.log(await body.json());
    }
    /* useEffect(()=>{
        console.log(reqBody);
    }) */
    
    const nameHandler = e =>{
        setformName(e.target.value)
     }
    const inStorageHandler = e =>{
        setinStorage(e.target.value)
     }
    const descriptionHandler = e =>{
        setdescription(e.target.value)
     }
    const imgUrlHandler = e =>{
        setImgUrl(e.target.value)
     }
    const priceHandler = e =>{
        setPrice(e.target.value)
     }

    return(<div className="center">
    <form onSubmit={submitHandler } action={SERVER_DOMAIN()+"/prods/admin/addProduct"} >
        <label htmlFor="name">name</label><input className="form-control" onChange={nameHandler} type="text" name = "name" />
        <label htmlFor="inStorage">In Storage quantity</label><input className="form-control" onChange={inStorageHandler} type="number" name = "inStorage" />
        <label htmlFor="description">description</label><input className="form-control" onChange={descriptionHandler} type="text" name = "description" />
        <label htmlFor="image Url">Image Url</label><input className="form-control" onChange={imgUrlHandler} type="text" name = "imageUrl" />
        <label htmlFor="price">price</label><input className="form-control" onChange={priceHandler} type="number" name = "price" />
        <button className="btn btn-primary" type="submit">submit</button>
    </form>
    </div>)
}