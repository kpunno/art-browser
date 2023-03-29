import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'

export default function MainNav() {
  const router = useRouter();
  const [searchData, setSearchData] = useState("Empty");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function handleSubmit(e) {
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${searchData}`));
    router.push(`/artwork?title=true&q=${searchData}`);
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" className='fixed-top navbar navbar-dark'>

        <Container fluid>
          <Navbar.Brand>Kristjan Punno</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" onClick={e => setIsExpanded(false)} />
          <Navbar.Collapse expanded={isExpanded.toString()} id="navbar-collapse">
          <Nav className="me-auto">
            <Link href='/' passHref legacyBehavior><Nav.Link active={router.pathname === "/"}>Home</Nav.Link></Link>
            <Link href='/search' passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              onChange={(e) => setSearchData(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={e => (setIsExpanded(false))} type="submit">Search</Button>
          </Form> 
          <Nav>
          &nbsp;&nbsp;
          <NavDropdown title="Username"  id="basic-nav-dropdown">
              <NavDropdown.Item ><Link href='/favourites' passHref legacyBehavior><Nav.Link style={{color: "black"}} active={router.pathname === "/favourites"}>Favourites</Nav.Link></Link></NavDropdown.Item>
              <NavDropdown.Item ><Link href='/history' passHref legacyBehavior><Nav.Link style={{color: "black"}} active={router.pathname === "/history"}>History</Nav.Link></Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}