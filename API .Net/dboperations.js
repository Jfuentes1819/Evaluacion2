var config = require('./dbconfig');
const sql = require('mssql');


async function getProducto(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Producto");
        return products.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function getProductos(productId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.Int, orderId)
        .query("SELECT * from Producto where Id = @input_parameter");
        return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addProduct(product){
    try{
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
        .input('Id', sql.Int, product.Id)
        .input('Nombre', sql.NVarChar, product.Nombre)
        .input('Descripcion', sql.NVarChar, product.Descripcion)
        .input('Precio', sql.Decimal, product.Precio)
        .input('CantidadEnStock', sql.Int, product.CantidadEnStock)
        .execute('InsertProducts');
        return insertProduct.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function deleteProduct(productId) {
    try {
        let pool = await sql.connect(config);

        
        let deleteProduct = await pool.request()
            .input('Id', sql.Int, productId)
            .execute('DeleteProduct'); 

        
        return deleteProduct.recordsets;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function updateProduct(product) {
    try {
        let pool = await sql.connect(config);

        
        let updateProduct = await pool.request()
            .input('Id', sql.Int, product.Id)
            .input('Nombre', sql.NVarChar, product.Nombre)
            .input('Descripcion', sql.NVarChar, product.Descripcion)
            .input('Precio', sql.Decimal, product.Precio)
            .input('CantidadEnStock', sql.Int, product.CantidadEnStock)
            .execute('UpdateProduct');

        
        return updateProduct.recordsets;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



module.exports = {
    getProducto:getProducto,
    getProductos:getProductos,
    addProduct:addProduct,
    deleteProduct:deleteProduct,
    updateProduct:updateProduct
    
}