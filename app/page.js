

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from "react-icons/fa";

function Home (){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        console.log("Users", response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try{
        await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        console.log("User Deleted");
        setUsers(prevUser => prevUser.filter(user => user.id !== id ));
        toast.success("User Deleted", {
            position: "bottom-right",
            autoClose: 3000
        });
    } catch(error){
        console.log("Error deleting user", error);
    }
  }

  const columns = [
    {
        field : "id",
        headerName: "ID",
        width : 90
    },
    {
        field : "username",
        headerName : "Name",
        width : 180
    },
    {
        field : "email",
        headerName : "Email",
        width: 190
    },
    {
        field : "phone",
        headerName: "Phone",
        width: 190
    },
    {
        field : "website",
        headerName : "Website",
        width: 190
    },
    {
        field : "city",
        headerName : "City",
        width : 150,
        renderCell : (params) => {
            return <span>{params.row.address.city}</span>
        }
    },
    {
        field : "name",
        headerName : "Comapany Name",
        width : 190,
        renderCell : (params) => {
            return <span>{params.row.company.name}</span>
        }
    },
    {
        field : "delete",
        headerName : "Action",
        width : 140,
        renderCell : (params) => {
            return (
                <Button onClick={() => handleDelete(params.row.id)} className="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                    <FaTrash />
                </Button>
            )
        }
    }
  ];

  return (
    <Container className="mt-4">
        <ToastContainer/>
      <div className="row">
        <div className="col-md-12">
        <DataGrid
        rows={users}
        rowHeight={100}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: { page: 0, pageSize: 5 },
            },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        />
        </div>
      </div>
    </Container>
  );
};

export default Home;
