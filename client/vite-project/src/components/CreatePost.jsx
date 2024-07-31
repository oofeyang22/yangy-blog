//import ReactQuill from 'react-quill'
//import 'react-quill/dist/quill.snow.css';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Quill from "../Quill";
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    async function createNewPost(ev) {
        const data = new FormData();

        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        //console.log(files, files[0]);
        
        ev.preventDefault();

        const response= await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });

        if(response.ok){
            setRedirect(true)
        }

        if(redirect){
           navigate('/')
        }
        //console.log(await response.json())
        
    }
    return(
        <form onSubmit={createNewPost}>
            <input type="title" 
                   placeholder={"title"}
                   value={title}
                   onChange = {ev => setTitle(ev.target.value)}/>
                   
            <input type="summary" 
                   placeholder={"summary"}
                   value = {summary}
                   onChange= {ev => setSummary(ev.target.value)}
                   />
            <input type="file"
                   onChange= {ev => setFiles(ev.target.files)}/>
            <Quill value={content} onChange={setContent} />
            <button style={{marginTop: '3rem'}}>Create Post</button>
        </form>
    )
}

export default CreatePost;
