import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

function Developers() {

  const [msg, setMsg] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [refresh, setRefresh] = useState(false)

useEffect(() => {
    axios
      .get(
        "https://product-node-app.vercel.app/productsList"
      )
      .then((res) => {
        console.log(res.data);
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);


  const handleSendMessage = async () => {
    try {
      console.log('Sending data:', { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail });
      await axios.post(`https://product-node-app.vercel.app/addProducts`,{id , title, description ,price, discountPercentage, rating, stock, brand, category, thumbnail});
      setRefresh(!refresh)
    } catch (error) {
      console.error('Message sending failed:', error);
    }
  };
 
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://product-node-app.vercel.app/deleteProduct/${productId}`);
      setRefresh(!refresh)
      // After successful deletion, you may want to refresh the product list or update the state.
    } catch (error) {
      console.error('Product deletion failed:', error);
    }
  };

  
  
  return(
  
  <>
  
    <table className="table table-light table-striped-columns">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">price</th>
      <th scope="col">discountPercentage</th>
      <th scope="col">rating</th>
      <th scope="col">stock</th>
      <th scope="col">brand</th>
      <th scope="col">category</th>
      <th scope="col">thumbnail</th>
      <th scope="col">action</th>
    </tr>
  </thead>

  {msg.map((product,index)=>{
    return(
     <tbody>
    <tr>
     
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.discountPercentage}</td>
      <td>{product.rating}</td>
      <td>{product.stock}</td>
      <td>{product.brand}</td>
      <td>{product.category}</td>
      <td id='tableImage'> <img
        width={"100%"} height="50px"
          src={product.thumbnail}
          alt='productImg'
          className="card-img-top"/>
      </td>
      <td>
      <div className='d-flex justify-content-evenly'>
      <Link to={`/Developers/${product._id}`}>
         <button type="button" className="btn btn-warning">UPDATE</button>
      </Link>
           <button onClick={() => handleDelete(product._id)} type="button" className="btn btn-danger">DELETE</button>
      </div>
      </td>
    </tr>
  </tbody>
  )
})}</table>

<>
  <div className="input-group mb-3">
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="form-control floatingInput"  placeholder="id"/>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control floatingInput"  placeholder="title"/>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control floatingInput"  placeholder="description"/>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control floatingInput"  placeholder="price"/>
          <input type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="form-control floatingInput"  placeholder="discountPercentage"/>
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control floatingInput"  placeholder="rating"/>
          <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="form-control floatingInput"  placeholder="stock"/>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control floatingInput"  placeholder="brand"/>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control floatingInput"  placeholder="category"/>
          <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="form-control floatingInput"  placeholder="thumbnail"/>
          <button onClick={handleSendMessage}className="btn btn-primary" type="submit"> Send </button>
      </div>
      <Outlet/>
  </>

</>)
}

export default Developers;