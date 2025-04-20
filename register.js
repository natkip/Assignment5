import React, { useState } from 'react';
import { submitRegister } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [details, setDetails] = useState({
        name: '',
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [lodaing, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateDetails = (event) => {
        setDetails({
          ...details,
            [event.target.id]: event.target.value
        });
    };

    const register = () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await displach(submitRegister(details));
            if (res?.success) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError('Register failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
        dispatch(submitRegister(details));
    };

    return (
        <div className="register-container">
            <Form className="register-form bg-dark text-light p-4 rounded">
                <h3>Register</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Registration successful!</Alert>}
                
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.name} type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.username} autoComplete="username" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={updateDetails} value={details.password} autoComplete="current-password" type="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={register} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                </Button>
            </Form>
        </div>
    );
}

export default Register;