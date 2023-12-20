import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';
import { marked } from 'marked';

const Single = () => {

    // useState({})表示对象，useState([])表示数组，useState('')表示字符串
    const [post, setPost] = React.useState({});

    const location = useLocation();

    const navigate = useNavigate();

    const postId = location.pathname.split('/')[2];

    const { currentUser }  = useContext(AuthContext);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    const createMarkup = () => {
        return { __html: marked(post.desc || '') };
    };

    return (
        <div className='single'>
            <div className="content">
                {/* <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4" alt="" /> */}
                {/* {post?.img} 比 {post.img} 更安全，前者在post为null时不会访问img属性，后者会继续访问从而报错 */}
                <img src={`../upload/${post.img}`} alt="" />
                <div className="user">
                    {/* <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />        */}
                    <img src={post?.uImg} alt="" />
                    <div className="info">
                        <span>{post?.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {/* 只有当前用户是文章作者时，才会显示编辑、删除按钮 */}
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                {/* <h1>TikTok owner ByteDance cuts gaming division jobs</h1> */}
                <h1>{post.title}</h1>
                <div className="mdDec" dangerouslySetInnerHTML={createMarkup()} />
                {/* <p>{post.desc}</p> */}
            </div>
            <Menu cat={post.cat}/>
        </div>
    );
};

export default Single;