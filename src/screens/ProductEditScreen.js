import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, updateProduct } from "../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";
import axios from "axios";

// Component Imports.
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(Number(0).toFixed(2));
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: productUpdateError,
    loading: updatingProduct,
    success: productUpdateSuccess,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productUpdateSuccess) props.history.push("/products");
    if (!product || product._id !== productId) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailProduct(productId));
    } else {
      setName(product.name);
      setPrice(Number(product.price).toFixed(2));
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, product, productId, productUpdateSuccess, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  // Handle image uploads.
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploadError(err.message);
      setUploading(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {updatingProduct && <LoadingBox />}
        {productUpdateError && (
          <MessageBox variant="danger">{productUpdateError}</MessageBox>
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File:</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                label="Upload an Image"
                onChange={(e) => handleFileUpload(e)}
              />
              {uploading && <LoadingBox />}
              {uploadError && (
                <MessageBox variant="danger">{uploadError}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand:</label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock:</label>
              <input
                id="countInStock"
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                <i className="fa fa-save"></i> Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
