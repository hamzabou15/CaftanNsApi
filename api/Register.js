const router = require('express').Router();
const Register = require('../models/Register');
const CryptoJS = require('crypto-js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./VerifyToken');

// creer un nouveau utilisateur 

router.post('/' , async (req, res) => {

   
    const NewRegister = new Register({
        FName : req.body.FName,
        LName: req.body.LName,
        Email : req.body.Email,
        Password : CryptoJS.AES.encrypt(req.body.Password , process.env.PASS_SEC).toString(), // on hash le mot de passe avec CryptoJS
        Adress : req.body.Adress,
    })
    try {
           
    // verfier si l'email déja existant
    const foundUser = await Register.findOne({Email: req.body.Email})
    /// creer l'utilisateur 
    // si l'urilisateur n'existe pas 
    if(!foundUser) {
        const newUser = await NewRegister.save()
        res.status(200).json(newUser)
    }
    // sinon l'ulisateur est déja exiatant
    else {
        res.status(404).json('utilisateur déja existant')
    }
        
    } catch (error) {
        res.status(404).json(error)
    }


})

// getAll users // si new on va trier que les 5 derniers
router.get('/' , verifyTokenAndAdmin , async (req, res) => {

    const query = req.query.new

    try {
        const  allUsers = query 
        ? await Register.find().limit(5).sort({_id:-1}) 
        : await Register.find();
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(404).json(error)
    }

})



/// deleteaLL 
router.delete('/' , verifyTokenAndAuthorization , async (req, res) => {
    if(req.body.Password) {
        req.body.Password = CryptoJS.AES.encrypt(req.body.Password , process.env.PASS_SEC).toString()
    }
    try {
       const delteALL = await Register.deleteMany()
       res.status(200).json(delteALL) 
        
    } catch (error) {
            console.log(error)
    }

})

// delete by ID 
router.delete('/:id' , verifyTokenAndAuthorization , async (req, res) => {
    if(req.body.Password) {
        req.body.Password = CryptoJS.AES.encrypt(req.body.Password , process.env.PASS_SEC).toString()
    }
    try {
       const delteALL = await Register.findByIdAndDelete(req.params.id)
       res.status(200).json("user has been deleted") 
        
    } catch (error) {
            console.log(error)
    }

})

// update user 

router.put('/:id' , verifyTokenAndAuthorization  , async (req , res) => {
    if(req.body.Password) {
        req.body.Password = CryptoJS.AES.encrypt(req.body.Password , process.env.PASS_SEC).toString()
    }
    try {
        const updateUser = await Register.findByIdAndUpdate(req.params.id , {
            $set : req.body
        }, {new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }

})

// find by id // if isAdmin

router.get('/:id' , verifyTokenAndAdmin , async (req, res) => {
    try {
        const user = await Register.findById(req.params.id)
        const {Password , ...others} = user._doc
        res.status(200).json(others)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

// user STATS

router.get('/find/stats', verifyTokenAndAdmin , async (req , res) => {

    const date = new Date()
    const lastYear = new Date(date.getFullYear(date.getFullYear() -1 ))
    try {
       const data = await Register.aggregate([
        {$match : {createdAt : {$gte : lastYear}}},  
        {$project: {
            month : {$month : '$createdAt'}, // la constante MONTH
        }},
        {$group:{
            _id: "$month", // group by month 
            total: {$sum:1}
        }}

       ])
       res.status(200).json(data)

    }catch(err) {
        res.status(500).json(err)
    }


})


module.exports =  router 
