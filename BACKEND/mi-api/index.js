const express= require('express')
const app=express()
const port=3010

app.use(express.json()) //middleware para que los datos sean json

//get,post,put,patch,delete...

//localhost:3010
//req> todo lo que llega de paramteros headers etcc res>
app.get('/',(req,res)=>{
    res.send("hola mundo")
});

const authors=[]
app.get('/authors',(req,res)=>{
    res.json(authors)
})

app.get('/authors/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const author=authors.find(a=>a.id===id)
    if (author){
        res.json(author)
    }else{
        res.status(404).json({message:'Autor no encontrado'})
    }
})

app.post('/authors',(req,res)=>{
    const author=req.body;
    author.id=authors.length+1
    authors.push(author)
    res.status(201).json(author)
})

app.put('/authors/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=authors.findIndex(a=>a.id===id);
    if (index!=-1){
        authors[index]={...authors[index],...req.body}
        res.json(authors[index])
    }else{
        res.status(404).json({message:'Autor no existe'})
    }
})

app.delete('/authors/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=authors.findIndex(a=>a.id===id);
    if (index!=-1){
        const deletedAuthor=authors.splice(index,1) //elimina elementos innecesarios de un array, el segundo es el num de elementos que se borraran
        res.json(deletedAuthor[0])
    }else{
        res.status(404).json({message:'Autor no existe'})}
    
})


//#region USERS
const users=[]
app.get('/users',(req,res)=>{
    res.json(users)
})

app.get('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const user=users.find(u=>u.id===id);
    if (user){
        res.json(user)
    }else{
        res.status(404).json({message:'Usuario no encontrado'})
    }
})

app.post('/users',(req,res)=>{
    const user=req.body;
    user.id=users.length+1
    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=users.findIndex(u=>u.id===id);
    if (index!=-1){
        users[index]={...users[index],...req.body}
        res.json(users[index])
    }else{
        res.status(404).json({message:'Usuario no existe'})
    }
    
})

app.delete('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=users.findIndex(u=>u.id===id);
    if (index!=-1){
        const deletedUser=users.splice(index,1) //elimina elementos innecesarios de un array, el segundo es el num de elementos que se borraran
        res.json(deletedUser[0])
    }else{
        res.status(404).json({message:'Usuario no existe'})}
    
})

//#endregion

//inicializar servidor
app.listen(port,()=>{
    console.log('servidor escuchando en el puerto',port)
})