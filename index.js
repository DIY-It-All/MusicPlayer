console.log('hello;)');
const express = require('express');
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { fileLoader } = require('ejs');
app.get('/', (req,res)=>{
    res.render('home');
});
app.post('/add',fileUpload({createParentPath: true}), (req,res)=>{
    const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'public', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

    res.redirect('/')
})
app.get('/musicList', (req,res)=>{
    fileList = fs.readdirSync(path.join(__dirname, 'public'));
    outArr = [];
    for(file of fileList){
        outArr.push({
            name: file.split('.')[0],
            path: file

        })
    }
    res.json({data: outArr});
})
app.listen(3000, ()=>{
    console.log('running on port 3000');
});