var jwt = require('jsonwebtoken');
const JWT_SECRET = "1781twguytdfg7q6wduy&**%f*ckqsfdwydf16o8yfde!#$@$#!";


const fetchuser=(req, res , next)=>{
    //Get the user form jwt token and id to req object.
    const token = req.header("token");
    const id = req.params.id;

    //Check if the token is valid.
    if(!token){
        
        res.status(401).send({error:'Unauthorized'});
    }
    try {
        
        const data = jwt.verify(token, JWT_SECRET);
        req.user =data.user;
        next();

    } catch (error) {
        res.status(401).send({error:'Unauthorized'});
    }
    }



module.exports= fetchuser;