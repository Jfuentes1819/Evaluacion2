const dboperations = require('./dboperations');
var Db = require('./dboperations');
var Producto = require('./Producto');

var express = require('express');
var bodyParser = require('body-parser');
var cors =require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
console.log('middleware');
})

router.route('/producto').get((request,response)=>{
    dboperations.getProducto().then(result => {
        console.log(result);
    })
})

router.route('/producto/:id').get((request,response)=>{
    dboperations.getProductos(request.params.id).then(result =>{
        response.json(result[0]);
    })
})

router.route('/product').post((request,response)=>{

    let product = {...request.body}
    dboperations.addProducto(producto).then(result =>{
        response.status(201).json(result);
    })
})

router.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body; 
        updatedProduct.Id = productId; 
        const result = await updateProduct(updatedProduct);
        res.status(200).json(result); 
    } catch (err) {
        console.error('Err updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await deleteProduct(productId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Producto API esta corriendo en' + port);
