const Product = require('./product.model')

exports.createProduct = async (productData) => {
    const product = new Product({ ...productData })
    await product.save()
    return product
}

exports.getAllProducts = async () => {
    const products = await Product.find({})
        .populate('user', ['fullname', 'email'])
        .sort({ _id: -1 })
    return products
}

exports.getSingleProduct = async (productId) => {
    return await Product.findOne({ _id: productId })
}

exports.deleteProduct = async (productId) => {
    return await Product.findOneAndDelete({ _id: productId })
}

exports.updateSingleProduct = async (_id, new_body) => {
    return await Product.findOneAndUpdate(_id, new_body, { new: true })
}

exports.getProductById = async (id) => {
    const product = await Product.findById(id)
    return product
}
