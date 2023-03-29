import {Container, Card, Form, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';
import {registerUser} from '@/lib/authenticate';
import {useRouter} from 'next/router';

export default function Login(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(user, password, password2);
            router.push('/login');
        }
        catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <>
        <Container fluid>
            <Card bg="light" body>
                <h2>Register</h2>Register a new account below:
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
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label><Form.Control type="password" value={password2} id="password" name="password" onChange={e => setPassword2(e.target.value)} />
                </Form.Group>
                <br/>
                <Button variant="primary" className="float-end" type="submit">Register</Button>
            </Form>
            </Card>
            {warning && (<><br/><Alert variant="danger">{warning}</Alert></>)}
            <br/>
        </Container>
        </>
    )
}