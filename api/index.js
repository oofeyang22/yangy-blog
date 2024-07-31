const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Post = require('./models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secretKey = '123sdet56jhjuth856'

app.use(cors({credentials: true, origin:'http://localhost:5173'}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://olaitanferanmi41:GWVTtp2xmm3HnI1q@cluster0.3pdf8zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((conn) =>{
    console.log('connection success')
})
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const user = await User.create({username, email, password: bcrypt.hashSync(password, salt)});
        res.json(user);
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }

    //res.json('test ok')
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const validPass = bcrypt.compareSync(password, user.password)

    if(validPass){
        jwt.sign({id: user._id, username}, secretKey, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: user._id,
                username
            });
        })
    } else {
        res.status(400).json('wrong credentials')
    }
    //res.json(user);
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;

    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;

        const post = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(post);
        //res.json(info);
    })

    //res.json({files: req.file});
    //res.json('ok');
});
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const post = await Post.findById(id);
      const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      await post.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : post.cover,
      });
      
      //await post.save();
      res.json(post);
    });

    
})
app.get('/post', async (req, res) => {
    //const posts = await Post.find();
    res.json(await Post.find()
                .populate('author', ['username'])
                .sort({createdAt: -1})
                .limit(20)
    )


});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const post = await Post.findById(id)
                            .populate('author', ['username']);
    res.json(post);
    //res.json(req.params)
})
app.listen(4000);
//

//GWVTtp2xmm3HnI1q