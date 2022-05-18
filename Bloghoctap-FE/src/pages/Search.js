import react, { useEffect, useState } from "react"
import NavBar from "../component/NavBar"
import Footer from "../component/Footer"
import {
    Container,
    Col,
    Spinner,
} from "react-bootstrap"
import "../css/search.css"
import { FcLike } from "react-icons/fc"
import avatar from "../image/avatar.jpg"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export default function Search() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { query } = useParams();
    const searchWords = query.split(/\s/).filter(word => word)
    let keyword = query;

    let location = useLocation();
    const hastagSearch = location.pathname.slice(1, 8) === "hashtag"
    if (hastagSearch) {
        const k = '#' + keyword;
        keyword = { hashtag: k };
        console.log(posts)
    } else {
        keyword = { q: keyword }
    }

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/post/search`, { params: keyword })
            .then((res) => {
                setPosts(res.data.data);
                setInterval(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setInterval(() => {
                    setLoading(false);
                }, 1000);
            });
    }, [query]);

    return (
        <>
            <NavBar />
            <div className="search-container">
                <div className="container container-body">
                    {loading ? (
                        <div className="loader">
                            <Spinner animation="grow" role="status" className="mx-auto">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <div className="row  justify-content-md-center">

                            <div className="col-3 search-list">
                                <h1>Search results</h1>
                                <ul>
                                    <li><a href="#">Post</a></li>
                                    <li><a href="#">Comment</a></li>
                                    <li><a href="#">People</a></li>
                                    <li><a href="#">Tag</a></li>
                                </ul>

                            </div>

                            <div className="col-7">

                                {posts.length === 0 && <h1>Không tìm thấy bài viết</h1>}

                                {

                                    posts.map((post) => {
                                        return (
                                            <div key={post._id} className="blog-item">
                                                <Link to={`/blog/${post._source.slug}`}>
                                                    <img src={post._source.coverImg} />
                                                    <div className="blog-item-content">
                                                        <div className="author">
                                                            <img src={avatar} />
                                                            Thắng Ngô
                                                        </div>
                                                        <div className="author-title">
                                                            {post._source.title}
                                                            <br />
                                                            <FcLike /><span>Reactions</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }


                                {/* 
                                <div className="blog-item">
                                    <a href="/blog">
                                        <div className="blog-item-content">
                                            <div className="author">
                                                <img src={avatar} />
                                                Thắng Ngô
                                            </div>
                                            <div className="author-title">
                                                Danh sách các Framework để tạo ra các ý tưởng khi làm Product
                                                <br />
                                                <FcLike /><span>Reactions</span>
                                            </div>
                                        </div>
                                    </a>
                                </div> */}


                            </div>
                            <div className="col-2"></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}


