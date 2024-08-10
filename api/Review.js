
const router = require('express').Router();

const Review = require("../models/Review");


router.post('/review' , async (req, res) => {

    const newReview = Review(req.body) 

    try {
        const saveReview = await newReview.save();

            res.status(200).json(saveReview);
    }
    catch (err) {
        res.status(500).json("Impossible d'emettre cette requete")
    }

})

router.delete('/review' , async (req, res) => {

    try {
         const deleteAll = await Review.deleteMany()   
        res.status(200).json(deleteAll)
    }
    catch(err) {
        console.log(err)
    }

})


router.get('/review' , async (req, res) => {


    try {
        const response = await Review.find({}).limit(3);
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json(err)
    }


})


module.exports =  router 
