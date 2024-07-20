const express = require('express');
const router = express.Router();
router.post('/itemsdata',(req,res)=>{
    try{
        res.send([global.itemsdata,global.catdata])
    }
    catch{
        console.log(err.message)
        res.send('server Error')
    }
})
module.exports=router;