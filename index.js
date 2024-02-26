console.log('hello;)');
const express = require('express');
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
var multer = require('multer');
var upload = multer({dest: './public/'});
app.use(upload.single('file'));
app.get('/', (req,res)=>{
    res.render('home');
});
app.post('/add', (req,res)=>{
    console.log(req.file);
    console.log(req.files);
    res.redirect('/')
})
app.listen(3000, ()=>{
    console.log('running on port 3000');
});