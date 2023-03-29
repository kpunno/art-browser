import {Container, Card, Form, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';
import {authenticateUser} from '@/lib/authenticate';
import {useRouter} from 'next/router';
import {useAtom} from 'jotai'
import {favouritesAtom, searchHistoryAtom} from '@/store';
import {getFavourites, getHistory} from '@/lib/userData'


export default function Login(props) {
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        setFavourites(await getFavourites());
        setSearchHistory(await getHistory());
    }

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push('/favourites');
        }
        catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <>
        <Container fluid>
            <Card bg="light" body>
                <h2>Login</h2>Enter your login information below:
                <hr/>
                <br/>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="primary" className="float-end" type="submit">Login</Button>
            </Form>
            </Card>
            {warning && (<><br/><Alert variant="danger">{warning}</Alert></>)}
            <br/>
        </Container>
        </>
    )
}