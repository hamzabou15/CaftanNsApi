const router = require('express').Router();
const Product = require('../models/Products.js');



/// ajouter un produit 
router.post('/', async (req, res) => {

    const newProduct = Product(req.body)
    try {
        const product = await newProduct.save()
        res.status(200).json(product)

    } catch (err) {
        console.log("error saving product")
    }


})

// trouver tous les produits 

router.get('/', async (req, res) => {

    try {
        const fetProducts = await Product.find();
        res.status(200).json(fetProducts)

    } catch (error) {
        console.log("error", error)
    }

})

// trouver un produit avec son ID 

router.get('/:id', async (req, res) => {

    idParams = req.params.id
    try {
        const getProduct = await Product.findById(idParams)
        res.status(200).json(getProduct);

    }
    catch (error) {
        console.log(error)
    }
})

// supprimer par id 

router.delete('/:id', async (req, res) => {
    idParams = req.params.id

    try {
        const getProduct = await Product.findByIdAndDelete(idParams)
        res.status(200).json(getProduct);

    }
    catch (error) {
        console.log(error)
    }


})

// related products 

router.get('/:id/related', async (req, res) => {

    id = req.params.id
    try {

        const actualProduct = await Product.findById(id)
        const catégorie = actualProduct.produitCategorie

        const related = await Product.find({
            produitCategorie: catégorie
        })
        const shuffled = [...related].sort(() => 0.5 - Math.random());
        const random = shuffled.slice(0, 6);
        res.status(200).json(random)


    }

    catch (err) {
        console.log(err)
    }


})


// trouver tous les produits avec du solde 

router.get('/sale', async (req, res) => {

    try {
        const getProducts = await Product.find();
        const getProductsSale = getProducts.filter(product => product.produitSale).sort({_id:-1});
        res.status(200).json(getProductsSale);

    } catch (error) {

        console.log(error)
    }
})

// sale avec les filtres 


router.get('/sale/items', async (req, res) => {


    let colors = req.query.color;
    const colorOptions = [
        "white", "lila", "gray", "black", "red", "yellow", "green", "blue", "beige", "fuschia", "bordeaux", "mustard",
        "oldPink", "pistache", "lightBlue", "orange", "purple", "darkBlue", "taupe"
    ]
    colors === "All"
        ? (colors = [...colorOptions])
        : (colors = req.query.color?.split(','))

    let availability1 = req.query.availabilityB;


    !req.query.availabilityB ?
        (availability1 = 0)   /// si on mets d'instructions
        : (req.query.availabilityB === 1) ?
            (availability1 = 1)  /// si on doit montrer que available
            : (req.query.availabilityB === 0) &&
            (availability1 = 1000) /// si on doit pas montrer available



    try {
        const sale = await Product.find({
            produitPrix: {
                $gte: parseInt(req.query.low_price), $lt: parseInt(req.query.high_price)
            },

        }).where("productDetails.details.colorOption").in([...colors]).where("productDetails.details.variables.quantity").gte(availability1)

        try {
            /// les résultats pour le prix elevé - bas 
            if (req.query.sort_by === "price-ascending") {
                const ascending = sale.sort((a, b) => a.produitPrix - b.produitPrix);
                const getProductsSale = ascending.filter(product => product.produitPrevPrix);
                res.status(200).json(getProductsSale);
            }
            /// les résultats pour le prix bas - elevé 
            if (req.query.sort_by === "price-descending") {
                const descending = sale?.sort((a, b) => b.produitPrix - a.produitPrix)
                const getProductsSale = descending.filter(product => product.produitPrevPrix);
                res.status(200).json(getProductsSale);
            }


            /// les résultats pour le pertinence 
            if (req.query.sort_by === "pertinence") {
                const pertinence = sale?.sort((a, b) =>
                    b.pertinence - a.pertinence)
                const getProductsSale = pertinence.filter(product => product.produitPrevPrix);
                res.status(200).json(getProductsSale);
            }


            if (!req.query.availability && !req.query.sort_by) {
                const getProductsSale = sale.filter(product => product.produitPrevPrix);
                res.status(200).json(getProductsSale);
            }


        }
        catch (err) {
            console.log(err)
        }

        if (!req.query.availability && !req.query.sort_by) {
            const getProductsSale = sale.filter(product => product.produitPrevPrix);
            res.status(200).json(getProductsSale);

        }
    }
    catch (err) {
        console.log(err)
    }

})

// highest and loest nouveauté

router.get('/sale/items/prodcut', async (req, res) => {


    try {

        const allPro = await Product.find().where('produitPrevPrix').ne(null).sort({ produitPrix: -1 }).distinct('produitPrix');
        res.status(200).json(allPro)

    } catch (err) {
        console.log(err)
    }


})


router.get('/search/search_category', async (req, res) => {
    let colors = req.query.color;
    const colorOptions = [
        "white", "lila", "gray", "black", "red", "yellow", "green", "blue", "beige", "fuschia", "bordeaux", "mustard",
        "oldPink", "pistache", "lightBlue", "orange", "purple", "darkBlue", "taupe"
    ]
    colors === "All"
        ? (colors = [...colorOptions])
        : (colors = req.query.color?.split(','))

    let availability1 = req.query.availabilityB;


    !req.query.availabilityB ?
        (availability1 = 0)   /// si on mets d'instructions
        : (req.query.availabilityB === 1) ?
            (availability1 = 1)  /// si on doit montrer que available
            : (req.query.availabilityB === 0) &&
            (availability1 = 1000) /// si on doit pas montrer available



    try {
        const category = await Product.find({
            produitCategorie: {
                $regex: req.query.categoryS,
                $options: "i",
            },
            produitPrix: {
                $gte: parseInt(req.query.low_price), $lt: parseInt(req.query.high_price)
            },

        }).sort({ _id: -1 }).where("productDetails.details.colorOption").in([...colors]).where("productDetails.details.variables.quantity").gte(availability1)

        try {
            /// les résultats pour le prix elevé - bas 
            if (req.query.sort_by === "price-ascending") {
                const ascending = category.sort((a, b) => a.produitPrix - b.produitPrix);
                res.status(200).json(ascending)
            }
            /// les résultats pour le prix bas - elevé 
            if (req.query.sort_by === "price-descending") {
                const descending = category?.sort((a, b) => b.produitPrix - a.produitPrix)
                res.status(200).json(descending)
            }


            /// les résultats pour le pertinence 
            if (req.query.sort_by === "pertinence") {
                const pertinence = category?.sort((a, b) =>
                    b.pertinence - a.pertinence)
                res.status(200).json(pertinence)
            }


            if (!req.query.availability && !req.query.sort_by) {
                res.status(200).json(category)
            }


        }
        catch (err) {
            console.log(err)
        }

        if (!req.query.availability && !req.query.sort_by) {
            res.status(200).json(category)

        }
    }
    catch (err) {
        console.log(err)
    }

})
// nouveautés home page 
router.get('/search/newin', async (req, res) => {

    try {
        const newIn = await Product.find({
            produitNew: true,
        }).limit(16).sort({ _id: - 1 })
        res.status(200).json(newIn)
    } catch (error) {
        res.status(500).json(error)
    }


})

// nouveatés 

router.get('/search/search_category/newin', async (req, res) => {


    let colors = req.query.color;
    const colorOptions = [
        "white", "lila", "gray", "black", "red", "yellow", "green", "blue", "beige", "fuschia", "bordeaux", "mustard",
        "oldPink", "pistache", "lightBlue", "orange", "purple", "darkBlue", "taupe"
    ]
    colors === "All"
        ? (colors = [...colorOptions])
        : (colors = req.query.color?.split(','))

    let availability1 = req.query.availabilityB;


    !req.query.availabilityB ?
        (availability1 = 0)   /// si on mets d'instructions
        : (req.query.availabilityB === 1) ?
            (availability1 = 1)  /// si on doit montrer que available
            : (req.query.availabilityB === 0) &&
            (availability1 = 1000) /// si on doit pas montrer available


    try {
        const fetchNewItem = await Product.find({
            produitNew: true,
            produitPrix: {
                $gte: parseInt(req.query.low_price), $lt: parseInt(req.query.high_price)
            },

        }).where("productDetails.details.colorOption").in([...colors]).where("productDetails.details.variables.quantity").gte(availability1).sort({ _id: -1 })

        try {
            /// les résultats pour le prix elevé - bas 
            if (req.query.sort_by === "price-ascending") {
                const ascending = fetchNewItem.sort((a, b) => a.produitPrix - b.produitPrix);
                res.status(200).json(ascending)
            }
            /// les résultats pour le prix bas - elevé 
            if (req.query.sort_by === "price-descending") {
                const descending = fetchNewItem?.sort((a, b) => b.produitPrix - a.produitPrix)
                res.status(200).json(descending)
            }

            /// les résultats pour le pertinence 
            if (req.query.sort_by === "pertinence") {
                const pertinence = fetchNewItem?.sort((a, b) =>
                    b.pertinence - a.pertinence)
                res.status(200).json(pertinence)
            }

            if (!req.query.availability && !req.query.sort_by) {
                res.status(200).json(fetchNewItem)
            }


        }
        catch (err) {
            console.log(err)
        }

        if (!req.query.availability && !req.query.sort_by) {
            res.status(200).json(fetchNewItem)

        }
    }
    catch (err) {
        console.log(err)
    }

})



/// highest lowest
router.get('/search/search_category/price', async (req, res) => {

    try {
        const allPro = await Product.find({
            produitCategorie: {
                $regex: req.query.categoryS,
                $options: "i",
            }
        }).sort({ produitPrix: -1 }).distinct('produitPrix');

        res.status(200).json(allPro)

    } catch (err) {
        console.log(err)
    }

})


// trouver un produit avec son titre 
router.get('/product/searchBytitle', async (req, res) => {
    let colors = req.query.color;
    const colorOptions = ["white", "lila", "gray", "black", "red", "yellow", "green", "blue", "beige", "fuschia", "bordeaux", "mustard",
        "oldPink", "pistache", "lightBlue", "orange", "purple", "darkBlue", "taupe"
    ]
    colors === "All"
        ? (colors = [...colorOptions])
        : (colors = req.query.color?.split(','))


    let availability1 = req.query.availabilityB;


    !req.query.availabilityB ?
        (availability1 = 0)   /// si on mets d'instructions
        : (req.query.availabilityB === 1) ?
            (availability1 = 1)  /// si on doit montrer que available
            : (req.query.availabilityB === 0) &&
            (availability1 = 1000) /// si on doit pas montrer available


    try {


        if (req.query.produitTitre !== "") {

            const product = await Product.find({   /// c'est le produit rechercher 
                produitTitre: {
                    $regex: req.query.produitTitre,
                    $options: "i",
                },
                produitPrix: {
                    $gte: parseInt(req.query.low), $lt: parseInt(req.query.high)
                },

            }).where("productDetails.details.colorOption").in([...colors]).where("productDetails.details.variables.quantity").gte(availability1)
            try {
                /// les résultats pour le prix elevé - bas 
                if (req.query.sort_by === "price-ascending") {
                    const ascending = product.sort((a, b) => a.produitPrix - b.produitPrix);
                    res.status(200).json(ascending)
                }
                /// les résultats pour le prix bas - elevé 
                if (req.query.sort_by === "price-descending") {
                    const descending = product?.sort((a, b) => b.produitPrix - a.produitPrix)
                    res.status(200).json(descending)
                }


                /// les résultats pour le pertinence 
                if (req.query.sort_by === "pertinence") {
                    const pertinence = product?.sort((a, b) =>
                        b.pertinence - a.pertinence)
                    res.status(200).json(pertinence)
                }


                if (!req.query.availability && !req.query.sort_by) {
                    res.status(200).json(product)
                }




            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            res.status(500).json("pas une valeur de recherche")
        }
    }
    catch (error) {
        console.log(error)
    }

})



/// trouver les produits avec du solde juste les 10 premiers 
router.get('/sale/fewones', async (req, res) => {

    try {
        const getProducts = await Product.find();
        const getProductsSale = getProducts.filter(product => product.produitSale).sort({_id : -1});
        const saleFiler = getProductsSale.slice(0, 10)
        res.status(200).json(saleFiler);
    } catch (error) {

        console.log(error)
    }
})


/// highest lowest
router.get('/product/searchBytitle/pricess', async (req, res) => {

    if (req.query.produitTitre) {

        try {
            const allPro = await Product.find({
                produitTitre: {
                    $regex: req.query.produitTitre,
                    $options: "i"
                }
            }).sort({ produitPrix: -1 }).distinct('produitPrix');


            res.status(200).json(allPro)

        } catch (err) {
            console.log(err)
        }
    }
    else {
        console.log("pas de valeur")
    }

})

// highest and loest nouveauté

router.get('/search/search_category/newin/price/data', async (req, res) => {



    try {
        const allPro = await Product.find({
            produitNew: true

        }).sort({ produitPrix: -1 }).distinct('produitPrix');

        res.status(200).json(allPro)

    } catch (err) {
        console.log(err)
    }


})

router.get('/product/searchBytitle/title', async (req, res) => {

    if (req.query.produitTitre !== "") {

        try {
            const allPro = await Product.aggregate([{
                $match: {
                    produitTitre: {
                        $regex: req.query.produitTitre,
                        $options: "i"
                    },

                }
            }])
            res.status(200).json(allPro)

        } catch (err) {
            console.log(err)
        }

    } else {
        res.status(500).json("pas une valeur de recherche")

    }


})
router.get('/product/searchBytitle/app', async (req, res) => {

    if (req.query.produitTitre !== "") {

        try {
            const allPro = await Product.find({})

            if (req.query.color !== "") {
                const pro = await Product.find().distinct('productDetails.details.colorOption') /// c le tableau des couleurs 
                const result = await Product.find(
                    { "productDetails.details.colorOption": "black" }
                )
                res.status(200).json(result)

            }
            else {

                res.status(200).json(allPro)
            }

        } catch (err) {
            console.log(err)
        }

    }



    else {
        res.status(500).json("pas une valeur de recherche")

    }


})


router.get('/product/searchBytitle/do', async (req, res) => {
    R
    try {

        const sommeQuantity = await Product.aggregate([{

            $match: { "productDetails.details.variables.quantity": { $gte: 0 } }

        }])
        res.status(200).json(sommeQuantity)


    } catch (err) {
        console.log(err)
    }


})


/// update product /// reduire la quantité 

router.patch('/update/pop', async (req, res) => {

    const quantity = req.body.quantity

    try {

        const result = await Product.updateMany(
            { "productDetails.details.variables._id": "63fb76e439ab0f1279d400c4" },

            {
                $inc: {
                    'productDetails.$[].details.$[].variables.$[xxx].quantity': - quantity
                }
            },
            {
                arrayFilters: [
                    { "xxx._id": '63fb76e439ab0f1279d400c4' }
                ]
            }
        )
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        console.log(err)

        res.status(404).json(err)
    }

})

/*
router.put('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const colorOption = req.body.colorOption;
    const variableTitre = req.body.variableTitre;
    const newQuantity = req.body.newQuantity;
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const details = product.productDetails[0].details;
  
      const updatedDetails = details.map((detail) => {
        if (detail.colorOption === colorOption) {
          const updatedVariables = detail.variables.map((variable) => {
            if (variable.titre === variableTitre) {
              variable.quantity -= newQuantity; // Soustraire la quantité
            }
            return variable;
          });
  
          detail.variables = updatedVariables;
        }
        return detail;
      });
  
      product.productDetails[0].details = updatedDetails;
  
      await product.save();
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  */


// update qunatity of product after achat 

router.put('/update', async (req, res) => {
    const productsToUpdate = req.body.products; // Récupération de la liste des produits depuis le corps de la requête

    try {
        for (const productData of productsToUpdate) { // pour chaque produits de la liste des produits "productsToUpdate"
            const { globalId, id, idColor, quantity } = productData; // les parameters du produit qui seront update dans le produit lui meme 

            // Recherche le produit par son ID dans la base de données
            const product = await Product.findById(globalId);

            if (!product) {
                return res.status(404).json({ error: `Product with ID ${globalId} not found` });
            }

            const details = product.productDetails[0].details; // Récupère les détails du produit à partir de la première entrée dans productDetails

            const updatedDetails = details.map((detail) => {

                if ((detail._id).toString() === idColor) { // Vérifie si l'ID de l'option de couleur correspond à celui fourni dans la requête

                    const updatedVariables = detail.variables.map((variable) => {
                        if ((variable._id).toString() === id) { // Vérifie si l'ID du titre correspond à celui fourni dans la requête
                            variable.quantity -= quantity; // Soustrait la quantité fournie de la quantité existante
                        }

                        return variable;
                    });

                    detail.variables = updatedVariables; // Met à jour les variables du détail avec les nouvelles valeurs
                }
                return detail;
            });

            product.productDetails[0].details = updatedDetails; // Met à jour les détails du produit avec les nouvelles valeurs

            await product.save(); // Sauvegarde les modifications du produit dans la base de données
        }

        res.json({ message: 'Products updated successfully' }); // Renvoie un message de réussite en réponse
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' }); // En cas d'erreur lors du traitement, renvoie une erreur 500
    }
});





module.exports = router 