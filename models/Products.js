const mongoose = require('mongoose');
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types;
const ProductSchema = new mongoose.Schema({

    produitTitre: {type:String , required:true},
    produitPrix:{type:SchemaTypes.Double  , required:true},
    produitPrevPrix:  {type:SchemaTypes.Double  },
    produitCategorie:{type:String , required:true},
    produitPrincipleImage:{type:String , required:true},
    produitSecondImage:{type:String , required:true},
    produitSale:{type:Number },
    pertinence : {type:Number , defaultValue:10 },
    productCollection:{type:String }, // la collection n'est pas obligatoir // un produit peut faire partie d'une catégorie et non pas une collection
    produitNew:{type: Boolean  }, /// si c le produit est nouveau ou pas
    quantity : {type:Number  },
    productDetails : [
        {
         details : [{
            url : {type:String , required:true}, /// la photo qui va avec la couleur
            colorOption :{type : String , required:true }, /// la couleur en question
            images : [],
            variables : [ // les variables de chaque couleurs prix // taille // disponibilité // quantiité 
                            {                            
                                isAvailabale : { type: Boolean , required:true  },
                                titre : { type: String  , default: "XS / 34 EU" },
                                taxe : { type: Boolean  , default: true ,  required:true },
                                prix : {type:Number , required:true},
                                quantity : {type:Number , required:true , default:0}
                            },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "XS / 34 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "S / 36 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "M / 38 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "L / 40 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "XL / 42 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        },
                        {
                            isAvailabale : { type: Boolean , required:true  },
                            titre : { type: String  , default: "XXL / 44 EU" },
                            taxe : { type: Boolean  , default: true ,  required:true },
                            prix : {type:Number , required:true},
                            quantity : {type:Number , required:true , default:0}
                            
                        }
                    ]
                }]
            }
        ]


});

module.exports = mongoose.model('ProductSchema' , ProductSchema);