import react, { useEffect, useState } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import "../css/profile.css"
import { AiFillLike, AiFillMail } from "react-icons/ai"
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FcLike } from "react-icons/fc"
import { Button } from "react-bootstrap"

export default function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState([]);
    const [isBlog, setIsBlog] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/user/profile`, {
                    token: userInfo.token,
                    _id: userInfo.id
                })
                .then((res) => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setAvatar(res.data.avatar);
                    //   setBlogs(res.data.blogs);
                    //   setLikedBlogs(res.data.likedBlogs);
                    // setInterval(() => {
                    //     setLoading(false);
                    // }, 1000);
                    console.log(res.data)
                })
                .catch((err) => {
                    // setInterval(() => {
                    //     setLoading(false);
                    // }, 1000);
                    navigate("/login");
                });

            getPostList();
        } else {
            setInterval(() => {
                setLoading(false);
            }, 1000);
            navigate("/login");
        }
    }, [navigate, setName, setEmail, setBlogs]);

    async function getPostList() {
        try {
            axios.post("http://localhost:5000/api/post/mypost",
                { token: JSON.parse(localStorage.getItem("userInfo")).token }
            ).then(result => {

                if (result.data.data && result.data.total >= 1) {
                    setBlogs(result.data.data)
                }
            })

        } catch (error) {
            console.log(error)
        }

    }
    const handleEdit = (slug) => {
        navigate(`/editpost/${slug}`);
    };
    return (
        <>
            <NavBar />
            <div className="profile-container">
                <div className="row justify-content-center profile-content">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12 profile-about">
                                <img src={avatar} />
                                <h3>{name}</h3>
                                {/* <span>Cứ thong thả thôi </span> */}
                                <div className="sticker">
                                    <ul>
                                        <li><AiFillMail />{email}</li>
                                    </ul>
                                </div>
                                <div className="btn btn-primary edit-btn">Edit</div>
                            </div>
                        </div>
                        <div className="row qq">
                            <div className="col-4 ss">
                                <div className="statistics">
                                    <ul>
                                        <li><AiFillLike />10 Likes</li>
                                        <li><FaComments />20 Commets</li>
                                        <li><BsFillFileEarmarkPostFill />{blogs.length} Posts</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-8 ww">
                                {
                                    blogs.map((post) => {
                                        return (
                                            <div key={post._id} className="blog-item">
                                                <Link to={`/blog/${post._source.slug}`}>
                                                    <img src={post._source.coverImg} />
                                                    <div className="blog-item-content">
                                                        <div className="author">
                                                            <img src={avatar} />
                                                            <div className='qq'>
                                                                <span>{post._source.authorName}</span>
                                                                <span className='day-post'>
                                                                    {new Date(post._source.createdAt).toDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="author-title">
                                                            <div className='tag-post'>
                                                                {
                                                                    post._source.tags.map((item, i) =>
                                                                        <span>{item}</span>
                                                                    )
                                                                }
                                                            </div>
                                                            {post._source.title}
                                                            <br />
                                                            <FcLike /><span>{post._source.likes.length}</span>
                                                            {/* <AiFillLike /><span>5 Reactions</span> */}
                                                            {/* <FaComments /><span>Comments</span> */}

                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="profile-post-button-control">
                                                    <Button
                                                        className="edit-button"
                                                        variant="info"
                                                        onClick={() => {
                                                            handleEdit(post._source.slug);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="edit-button"
                                                        variant="danger"
                                                    // onClick={() => {
                                                    //   handleDelete(blog._id);
                                                    // }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

