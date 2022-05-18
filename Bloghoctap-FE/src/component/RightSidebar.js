import React from 'react'
import { Link } from 'react-router-dom'

export const RightSidebar = ({ posts }) => {

    return (
        <div className="col-3 more-area">
            <div className="more-area-header">Popular</div>
            {posts && posts.length > 0 &&
                posts.map((item, i) => {
                    return (
                        <div key={item.id} className="more-area-tag">
                            <div className="tag-header">{item.tag}</div>
                            {item.data &&
                                item.data.map(i =>
                                    <div key={item._id} className="tag-content">
                                        <Link to={`/blog/${i.slug}`}>
                                            {i.title + " - " + i.authorName}
                                            <br />
                                            {/* <span className="tag-content-comment">3 comments</span> */}
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    )
                })

            }
        </div>
    )
}
