import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
const NavbarComp = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="140"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}

                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
export default NavbarComp