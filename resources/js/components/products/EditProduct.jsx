import { update } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [avatar, setAvatar] = useState(true);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        await axios
            .get(`/api/get_edit_product/${id}`)
            .then(({ data }) => {
                // console.log("data", data);
                const { name, description, photo, type, quantity, price } =
                    data.product;
                setName(name);
                setDescription(description);
                setPhoto(photo);
                setType(type);
                setQuantity(quantity);
                setPrice(price);
            })
            .catch(({ response: { data } }) => {});
    };

    const ourImage = (img) => {
        return "/upload/" + img;
    };

    const changeHandler = (e) => {
        let file = e.target.files[0];
        let limit = 1024 * 1024 * 2;
        if (file["size"] > limit) {
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Something went wrong",
                footer: "Why do I have this issue?",
            });
        } else {
            let reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(false);
                setPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("photo", photo);
        formData.append("type", type);
        formData.append("quantity", quantity);
        formData.append("price", price);
        await axios
            .post(`/api/update_product/${id}`, formData)
            .then((data) => {
                toast.fire({
                    icon: "success",
                    title: "Product update successfully",
                });
                navigate("/");
            })
            .catch((error) => {});
    };

    return (
        <div className="container">
            <div className="product_edit">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Edit product</h1>
                    </div>
                    <div className="titlebar_item">
                        <button
                            className="btn"
                            onClick={(e) => updateProduct(e)}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="card_wrapper">
                    <div className="wrapper_left">
                        <div className="card">
                            <p>Name</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />

                            <p>Description (Optional)</p>
                            <textarea
                                cols="10"
                                rows="5"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>

                            <div className="media">
                                <ul className="image_list">
                                    <li className="image_item">
                                        <div className="image_item-img">
                                            {avatar === true ? (
                                                <img
                                                    src={ourImage(photo)}
                                                    width="117px"
                                                    height="100px"
                                                />
                                            ) : (
                                                <img
                                                    src={photo}
                                                    width="117px"
                                                    height="100px"
                                                />
                                            )}
                                        </div>
                                    </li>
                                    <li className="image_item">
                                        <form className="image_item-form">
                                            <label className="image_item-form--label">
                                                Add Image
                                            </label>
                                            <input
                                                type="file"
                                                className="image_item-form--input"
                                                onChange={changeHandler}
                                            />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper_rigth">
                        <div className="card">
                            <p>Product Type</p>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                            />
                            <hr className="hr" />
                            <p>Inventory</p>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                }}
                            />
                            <hr className="hr" />
                            <p>Price</p>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                            <div className="br"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
