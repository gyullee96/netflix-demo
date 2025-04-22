import '../App.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const AppLayout = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchByKeyword = (event) => {
        event.preventDefault();
        // url을 바꿔주기
        navigate(`/movies?q=${keyword}`);
        setKeyword('');
    }

    return (
        <div>
            <Navbar className='Navbar'>
                <Container fluid>
                    <img className="netflixlogo" src="https://wallpapers.com/images/featured/netflix-logo-png-fqwt81hprrz7xsfg.jpg" alt="" />
                    <Navbar.Brand href="#"></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand`}
                        aria-labelledby={`offcanvasNavbarLabel-expand`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <Nav.Link as={Link} to='/' style={{ color: 'white' }}>Home</Nav.Link>
                                <Nav.Link as={Link} to='/movies' style={{ color: 'white' }}>Movies</Nav.Link>
                            </Nav>
                            <Form className="d-flex" onSubmit={searchByKeyword}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={keyword}
                                    onChange={(event) => setKeyword(event.target.value)}
                                />
                                <Button type='submit' variant="outline-danger">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default AppLayout