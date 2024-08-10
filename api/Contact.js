const Contact = require('../models/Contact');

const router = require('express').Router();





router.post('/' , async (req , res) =>    {

    const contact = Contact(req.body)

    try {
            const newContact = await contact.save()
            res.status(200).json(newContact)

    } catch (error) {
        res.status(500).json(error)
    }


} )


router.get('/' , async (req , res) =>    {

    try {
            const AllContact = await Contact.find()
            res.status(200).json(AllContact)

    } catch (error) {
        res.status(500).json(error)
    }


} )

// delete by id
router.delete('/:id' , async (req , res) =>    {

    const idContact = req.params.id
    try {
            const AllContact = await Contact.findByIdAndDelete(idContact)
            res.status(200).json("Email supprimer")

    } catch (error) {
        res.status(500).json(error)
    }


} )

module.exports =  router 



