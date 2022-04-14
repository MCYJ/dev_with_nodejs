import { readFile } from "fs";
import express from "express";
import path from "path";

const __dirname = path.resolve();
// const express = require('express')
const app = express();
let pageData = '';

readFile('./index.html', 'utf-8', (err, data) => {
    pageData = data;
    console.log(pageData);
});

// pages 경로로 들어오는 요청에 대해서는 
// __dirname : main.js가 있는 폴더 위치
// __dirname+'/pages'가 있는 경로로 가라
 app.use('/scripts', express.static(__dirname+'/scripts'));

// initiate server
app.listen(3000, (req,res)=>{
    console.log('누군가 연락함');
})

// process routine
app.get('/', (req, res)=>{
    console.log('root requested');
    res.sendFile(__dirname+'/pages/index.html');
})

app.get('/about', (req, res)=>{
    console.log('about requested');
    res.sendFile(__dirname+'/pages/about.html');
    console.log(req.path);
//    console.log(res);
})

app.get('/working', (req, res)=>{
    console.log('working requested');
    res.sendFile(__dirname+'/pages/working.html');
})

app.get('/data', (req, res)=>{
    res.writeHead('200', {
        'Content-Type':'text/html'
    });
    res.write(pageData);
    res.end();
})
