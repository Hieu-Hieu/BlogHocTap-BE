import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import "../css/navbar.css";

function isHashtag(hashtag) {
  // Regular expression to check if string is a hashtag
  const regexExp = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;

  return regexExp.test(hashtag); // true
}

export default function NavBar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo) {
      setLoggedIn(true);
      setName(userInfo.name)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (isHashtag(query)) {
      navigate(`/hashtag/${query.slice(1)}`);
    } else {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Blog Học Tập
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            {/* Search Bar */}
            <Nav className="me-auto">
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  handleSearch(e);
                }}
              >
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <Button type="submit" variant="success">
                  <FaSearch />
                </Button>
              </Form>
            </Nav>

            {loggedIn ? (
              <Nav>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="new-post"
                    onClick={() => {
                      navigate("/createpost");
                    }}
                  >
                    Tạo chủ đề
                  </Button>
                </Nav.Link>

                <Nav.Link className="noti">
                  <BsBell />
                </Nav.Link>

                <NavDropdown
                  align={{ lg: "end" }}
                  title={
                    <div className="user-icon">
                      <img src={avatar || 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png'} />
                    </div>
                  }
                >
                  <NavDropdown.Item>{name}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="login"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="success"
                    className="signup"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
