import React from "react"
import { Link } from "react-router-dom"
import "../css/footer.css"

export default function Footer() {
    return (
        <footer className="footer">
                <p>
                <a className="footer-link" href="/">Blog Học Tập Việt Nam</a>
                - Một nơi học tập cho cái học sinh Việt Nam</p>
                <div>
                    <p>
                        Một blog từ môn học <a className="footer-link">Search Engine</a> - Ứng dụng <a className="footer-link">ElastichSearch</a> vào project để hỗ trợ tìm kiếm.
                    </p>
                    <p>
                        Project được thực hiện bởi <a className="footer-link">Nhóm 2</a> đề tài 2.
                    </p>
                </div>
        </footer>
    )
}

