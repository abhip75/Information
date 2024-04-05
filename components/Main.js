"use client";
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Main() {
  return (
    <>
       
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link href="/" style={{textDecoration: "none"}}>Navbar</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >

                   
                    <Link href="/" style={{textDecoration: "none"}} className='m-2'>Home</Link>
                   
                  
                    <Link href="/product" style={{textDecoration: "none"}} className='m-2'>Product</Link>
                   
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
}

export default Main;