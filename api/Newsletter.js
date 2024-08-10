
const router = require('express').Router();

const News = require("../models/Newsletter");


router.post('/' , async (req, res) => {

    const newNews= News(req.body) 

    try {
        const saveNews= await newNews.save();

            res.status(200).json(saveNews);
    }
    catch (err) {
        res.status(500).json("Impossible d'emettre cette requete")
    }

})

module.exports =  router 
