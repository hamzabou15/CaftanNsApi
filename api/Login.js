const router = require('express').Router();
const Login = require('../models/Login');
const Register = require('../models/Register');
var AES = require("crypto-js/aes");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


router.post('/' , async (req, res) => {

    const LoginBody = Login(req.body)
    const RegisterBody = Register(req.body)

    try{
        const findUser = await Register.findOne({Email: LoginBody.Email})
        if(!findUser) {
            res.status(404).json('utulisateur introuvable')
        } 
        else {
            const hashedPassword =  CryptoJS.AES.decrypt(
                findUser.Password,
                process.env.PASS_SEC
            )
            const Password = hashedPassword.toString(CryptoJS.enc.Utf8)
                
            if(   Password !== req.body.Password){
            res.status(404).json('password pas correct')
            }else {
                /// on va envoyer que les autres données sauf le password
                const accessToken = jwt.sign(
                {
                    id: findUser._id,
                    isAdmin : findUser.isAdmin
                },
                process.env.JWT_SEC ,
                {expiresIn:"356d"}
                
                )
                const {Password , ...others} = findUser._doc
                res.status(200).json({others , accessToken} )

            }
          
        }

    }
    catch(err) {
        console.log(err)
    }

})
module.exports =  router 
