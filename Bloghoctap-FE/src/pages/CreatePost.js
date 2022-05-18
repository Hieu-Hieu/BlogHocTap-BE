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
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../css/createpost.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getHashtag = (hashtag) => {
    let tags = hashtag.split(/[\s,]+/).map(item => item.startsWith("#") ? item : ('#' + item));
    return tags;
}

// ClassicEditor
//     .create(document.querySelector('#editor'), {
//         plugins: [Base64UploadAdapter]
//     }).then(editor => {
//         console.log('Editor was initialized', editor);
//     })
//     .catch(error => {
//         console.error(error.stack);
//     });

export default function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [tagText, setTagText] = useState("");
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const sanitizeContent = content.trim();
        if (sanitizeContent.length < 20) {
            setError(true);
            setErrorMessage("Content must be at least 20 characters long");
            setSubmitting(false);
            setTimeout(() => {
                setError(false);
                setErrorMessage("");
            }, 3000);
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", sanitizeContent);
        formData.append("image", imageData);
        formData.append("tags", tags);
        formData.append("date", new Date());
        formData.append("token", JSON.parse(localStorage.getItem("userInfo")).token);
        axios({
            method: "post",
            url: `http://localhost:5000/api/post`,
            data: formData,
        })
            .then((res) => {
                setSubmitting(false);
                console.log(res)
                navigate("/");
            })
            .catch((err) => {
                setSubmitting(false);
                setError(true);
                setErrorMessage(err.response.data.error);
                navigate("/login");
            });
    };
    return (
        <>
            <NavBar />

            <div className="createpost-container">
                <Container>
                    <Card>
                        <Card.Body>
                            <h1 className="heading">Create Post</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Add a cover image
                                        <Form.Control
                                            type="File"
                                            accept="image/*"
                                            value={imageName}
                                            onChange={(e) => {
                                                setImage(URL.createObjectURL(e.target.files[0]));
                                                setImageData(e.target.files[0]);
                                                setImageName(e.target.value);
                                            }}
                                            name="image"
                                        />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    {image && (
                                        <img className="img-preview" src={image} alt="preview" />
                                    )}
                                    {image && (
                                        <Button
                                            variant="primary"
                                            className="remove-image"
                                            onClick={() => {
                                                setImage(null);
                                                setImageData(null);
                                                setImageName("");
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Form.Group>
                                <Form.Group>

                                    <Form.Control
                                        type="text"
                                        placeholder="New post title here ..."
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        required
                                    />

                                    {/* <input
                                        type="text"
                                        placeholder="Add 4 Tag Name"
                                        className="addtagname"
                                        required
                                    /> */}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        <Form.Control
                                            className="add-tagname"
                                            type="text"
                                            placeholder="Add up to 4 tags..."
                                            value={tagText}
                                            onChange={(e) => {
                                                setTagText(e.target.value);
                                                setTags(getHashtag((e.target.value)))
                                            }}
                                            required
                                        />
                                        {tags.join(" ")}
                                    </Form.Label>
                                </Form.Group>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                    }}
                                    config={{
                                        placeholder: "Start typing your blog here...",
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="mt-3 submit"
                                    {...(submitting ? { disabled: true } : {})}
                                >
                                    {submitting ? (
                                        <Spinner as="span" animation="border" role="status" />
                                    ) : (
                                        "Publish"
                                    )}
                                </Button>
                            </Form>
                            {error && <p className="error">{errorMessage}</p>}
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            <Footer />
        </>
    )
}



