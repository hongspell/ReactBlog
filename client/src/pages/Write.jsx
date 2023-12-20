import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {

    const state = useLocation().state;

    const [value, setValue] = useState(state?.desc || '');

    const [title, setTitle] = useState(state?.title || '');

    const [file, setFile] = useState(null);

    const [cat, setCat] = useState(state?.cat || 0);

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            // the name 'file' must be the same as the name in the backend
            // formData.append('file', file);
            formData.append('file', file);
            const res = await axios.post('/upload', formData);
            // notify the user that the upload is successful
            toast.success('Upload Successful');
            return res.data;
        } catch (error) {
            console.log(error);
            // notify the user that the upload is failed
            toast.error('Upload Failed');
        }
    };

    const handleClick = async e => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state ? await axios.put(`/posts/${state.id}`, {
                title, desc: value, cat, img:file ? imgUrl : " "
            }) : await axios.post(`/posts/`, {
                title, desc: value, cat, img:file ? imgUrl : " ", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='add'>
            <ToastContainer />
            <div className="content">
                <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)} />
                <div className="editorContainer">
                    {/* 富文本编辑器 */}
                    {/* <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} /> */}
                    {/* mark down编辑 */}
                    <MDEditor height={280} className='editor' value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "1"} name="cat" value="1" id="blog" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="blog">blog</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "2"} name="cat" value="2" id="project" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="project">project</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "3"} name="cat" value="3" id="life" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="life">life</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "4"} name="cat" value="4" id="resume" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="resume">resume</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write