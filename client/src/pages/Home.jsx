import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {

    // useState({})表示对象，useState([])表示数组，useState('')表示字符串
    const [posts, setPosts] = useState([])

    // GET LOCATION INFO
    // const location = useLocation();
    // THIS INFO IS FROM Navbar.jsx
    const cat = useLocation().search;
    
    // useEffect（钩子），接收连个参数，1. ()=>{} 的函数，2. [] 依赖数组。函数定义了异步获取数据的操作，当后面的依赖数组的值发生变化时，前面的函数就会重新执行。
    // 也就是说 ?cat=1、?cat=2、?cat=3、?cat=4 这四个值发生变化时，前面的函数就会重新执行。
    // 因此，[cat] 在这里的作用是确保每当URL的查询参数变化时，组件都会重新获取与新查询参数相对应的数据。这是一种响应式编程的实践，确保了组件状态的及时更新。
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${cat}`);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [cat]);

    return (
        <div className='home'>
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{post.desc}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                                <button>Read More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home