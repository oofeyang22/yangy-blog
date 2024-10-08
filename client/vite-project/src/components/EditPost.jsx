import React, {useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Quill from "../Quill";

const EditPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState('');
    //const [cover, setCover] = useState('')
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        fetch('http://localhost:4000/post/'+id, ).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
            })
        })
    }, [])



    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('category', category);
        data.set('content', content);
        data.set('id', id);

        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
          method: 'PUT',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        }
      }

    if(redirect){
        navigate('/post/'+id)
    };

    return(
        <form onSubmit={updatePost}>
            <input type="title" 
                   placeholder={"title"}
                   value={title}
                   onChange = {ev => setTitle(ev.target.value)}/>
            
            <input type="text"
                   placeholder={"category"} 
                   value={category}
                   onChange={ ev => setCategory(ev.target.value)}
                   />
                   
            <input type="summary" 
                   placeholder={"summary"}
                   value = {summary}
                   onChange= {ev => setSummary(ev.target.value)}
                   />
            <input type="file"
                   onChange= {ev => setFiles(ev.target.files)}/>
            {/*<ReactQuill value={content} 
                        onChange = {newValue => setContent(newValue)}
                        modules={modules} 
                        formats={formats}/>*/}
            
            <Quill onChange={setContent} value={content} />
            <button style={{marginTop: '3rem'}}>Edit Post</button>
        </form>
    )

}

export default EditPost