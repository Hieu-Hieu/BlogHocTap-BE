import Axios from 'axios';
import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import avatar from "../image/avatar.jpg"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { Link } from "react-router-dom"
import { FaComments } from "react-icons/fa"
import { RightSidebar } from '../component/RightSidebar';
import Footer from "../component/Footer"
import NavBar from "../component/NavBar"
import "../css/home.css"
import "../css/search.css"

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [postByTag, setPostByTag] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?.id;
    useEffect(() => {

        getPostList();
        getPostByTag();
    }, [])
    // console.log(posts)
    async function getPostList() {
        try {
            Axios.get("http://localhost:5000/api/post").then(result => {
                // console.log(result.data)
                if (result.data.data && result.data.total >= 1) {
                    setPosts(result.data.data)
                    // console.log(result.data.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function getPostByTag() {
        try {
            Axios.get("http://localhost:5000/api/post/tags-posts-popular").then(result => {
                if (result.data) {
                    setPostByTag(result.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleLikePost = (postId) => {
        if (userId) {
            Axios.get(`http://localhost:5000/api/post/like/${postId}/${userId}`).then(result => {
                if (result) {
                    setTimeout(() => {
                        getPostList()
                    }, 1000)
                }
            })
        }
    }

    const checkLikes = (likes) => {
        if (likes.includes(userId))
            return true
        return false
    }

    return (
        <>
            <NavBar />
            <div className="home-container ">
                <Container>
                    <div className="row justify-content-md-center">
                        <div className="col-6 content-area">
                            <h1> Bài viết</h1>
                            {
                                posts.map((post) => {
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
                                                                    <span key={i}>{item}</span>
                                                                )
                                                            }

                                                        </div>
                                                        {post._source.title}
                                                        <br />

                                                    </div>
                                                </div>
                                            </Link>
                                            <div className='blog-reaction-icon'>
                                                {
                                                    checkLikes(post?._source?.likes) ?
                                                        <FcLike onClick={() => handleLikePost(post._id)} />
                                                        : <FcLikePlaceholder onClick={() => handleLikePost(post._id)} />
                                                }
                                                <span className='like-count'>{post._source.likes.length}</span>
                                                {/* <AiFillLike /><span>5 Reactions</span> */}
                                                <FaComments /><span className='comment-count'>Comments</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <RightSidebar posts={postByTag} />
                    </div>
                </Container>
            </div >
            <Footer />
        </>
    )
}
