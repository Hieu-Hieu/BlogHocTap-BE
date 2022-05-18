import React, { useState, useEffect } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import {
    Container,
    Card,
    Form,
    Button,
    Spinner
} from "react-bootstrap"
import "../css/login.css"
import "../css/navbar.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AiFillGoogleCircle } from "react-icons/ai"
import { AiFillFacebook } from "react-icons/ai"


export default function Signup() {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        setSubmitting(true);
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        if (password !== confirmPassword) {
            setError(true);
            setErrorMsg("Mật khẩu không khớp");
            setTimeout(() => {
                setError(false);
                setErrorMsg("");
            }, 3000);
            setSubmitting(false);
            event.stopPropagation();
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user`, {
            name,
            email,
            password,
        })
            .then((res) => {
                setSubmitting(false);
                navigate("/login");
            })
            .catch((err) => {
                setSubmitting(false);
                setError(true);
                setErrorMsg(err.response.data.error);
                setTimeout(() => {
                    setError(false);
                    setErrorMsg("");
                }, 3000);
            });

        setValidated(true);
    };
    return (
        <>
            <NavBar />
            <div className="signup-container">
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title>Blog học tập Việt Nam</Card.Title>
                            <p className="talk-about"><a href="/">Bolg học tập Việt Nam</a> là cộng đồng trao đổi cho cái thành viên </p>

                            <Button className="button-login button-google">
                                <AiFillGoogleCircle /> Đăng kí với Google
                            </Button>

                            <Button className="button-login button-facebook">
                                <AiFillFacebook /> Đăng kí với Facebook
                            </Button>
                            <br />
                            <p className="drop-line"> <hr /> Hoặc <hr /> </p>
                            <div className="error">{error && <p>{errorMsg}</p>}</div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Bạn chưa nhập tên!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide email
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Hãy nhập mật khẩu của bạn
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        NHập lại mật khẩu
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    {...(submitting ? { disabled: true } : {})}
                                >
                                    {submitting ? (
                                        <Spinner as="span" animation="border" role="status" />
                                    ) : (
                                        "Đăng kí"
                                    )}
                                </Button>
                                <p className="drop-line drop-signin"><hr /><spa>Bạn đã có tài khoản?<a className="drop-link" href="/login"> Đăng nhập</a></spa><hr /></p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            <Footer />
        </>
    )
}

