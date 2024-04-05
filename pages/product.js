"use client";
import Main from "@/components/Main";
import { Button, Container, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaTrash } from "react-icons/fa";
import RatingStars from "@/components/RatingStars";

function ProductData(){

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then(response => {
            setProducts(response.data);
            console.log("products", response.data);
        })
        .catch((error) => {
            console.log("Error fetching the data", error);
          });
    },[])

    const handleDeleteProduct = async (id) => {
        try{
          await axios.get(`https://fakestoreapi.com/products/${id}`)
          setProducts(prevProduct => prevProduct.filter(product => product.id != id));
          toast.success("Product Deleted", {
            position: "bottom-right",
            autoClose: 3000
        });
        } catch(error){
             console.log("Error deleting data",error);
        }
     } 
 
     const handleView = (product) => {
        setSelectedProduct(product);
         setShowModal(true);
     }
 
     const handleCloseModal = () => {
        setShowModal(false);
     }

    const columns = [
        {
            field : "id",
            headerName : "ID",
            width : 90
        },
        {
            field : "title",
            headerName : "Title",
            width : 400
        },
        {
            field : "category",
            headerName : "Category",
            width : 180
        },
        {
            field : "image",
            headerName : "Picture",
            width : 190,
            renderCell : (params) => {
                return <img src={params.value} alt="Product" style={{width: 100, height:100, cursor:"pointer"}}/>
            }
        },
        {
            field : "price",
            headerName : "Price",
            width : 160,
            renderCell : (params) => {
                return <span>$ {params.row.price}</span>
            }
        },
        {
            field : "delete",
            headerName : "Action",
            width : 140,
            renderCell : (params) => {
                return (
                    <div>
                        <Button onClick={() => handleDeleteProduct(params.row.id)} className="btn btn-danger m-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                            <FaTrash />
                        </Button>
                        <Button onClick={() => handleView(params.row)} className="btn btn-primary m-1" data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                            <FaEye />
                        </Button>
                    </div>
                    
                )
            }
        }
    ]

    // const totalPrice = () => {
    //     return products.reduce((total,product) => total + product.price,0)
    // }
  

    return(
        <>
        <Main/>
        <ToastContainer/>
        <Container className="mt-5">
          
            <div className="row">
                <div className="col-md-12">
                    
                    <DataGrid
                    rows={products}
                    columns={columns}
                    rowHeight={130}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    />
                </div>
            </div>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal}>
            <ModalHeader>
                <ModalTitle><h4>{selectedProduct && selectedProduct.title}</h4></ModalTitle>
            </ModalHeader>
            <ModalBody>
                {selectedProduct && (
                    <div>
                        <img src={selectedProduct.image} alt="Product" style={{width: 100, height:100}} />
                        <p className="mt-1 fw-bold">{selectedProduct.description}</p>
                        <RatingStars rating={selectedProduct.rating.rate} />
                        <p className="fw-semibold">Rating: {selectedProduct.rating.rate}</p>
                    </div>
                )}
            </ModalBody>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ProductData;   