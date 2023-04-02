import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'
import { removeToken,readToken, isAuthenticated } from '@/lib/authenticate'

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

  function logout() {
    setIsExpanded(false);
    removeToken('access_token');
    router.push('/login')
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" className='fixed-top navbar navbar-dark' expanded={isExpanded}>

        <Container fluid>
          <Navbar.Brand>Kristjan Punno</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" onClick={e => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="navbar-collapse">
          <Nav className="me-auto">
            <Link href='/' passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={e => setIsExpanded(false)}>Home</Nav.Link></Link>
            {isAuthenticated() && <Link href='/search' passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={e => setIsExpanded(false)}>Advanced Search</Nav.Link></Link>}
          </Nav>
          {isAuthenticated() ? <>
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
              <NavDropdown title={readToken().userName} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item><Link href='/favourites' passHref legacyBehavior><Nav.Link style={{color: "black"}} active={router.pathname === "/favourites"} onClick={e => setIsExpanded(false)}>Favourites</Nav.Link></Link></NavDropdown.Item>
                <NavDropdown.Item><Link href='/history' passHref legacyBehavior><Nav.Link style={{color: "black"}} active={router.pathname === "/history"} onClick={e => setIsExpanded(false)}>History</Nav.Link></Link></NavDropdown.Item>
                <NavDropdown.Item onClick={logout}><Link href='/login' passHref legacyBehavior><Nav.Link style={{color: "black"}}>Log out</Nav.Link></Link></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </> 
          : <Nav className="mr-auto">
              <Link href='/register' passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={e => setIsExpanded(false)}>Register</Nav.Link></Link>
              <Link href='/login' passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={e => (setIsExpanded(false))}>Login</Nav.Link></Link>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}