const Product = require('./product.model')

exports.createProduct = async (user, productData) => {
    const product = new Product({ user, ...productData })
    await product.save()
    return product
}

exports.getAllProducts = async () => {
    const products = await Product.find({})
    return products
}

exports.getProductById = async (id) => {
    const product = await Product.findById(id)
    return product
}
