const Cart = require('./cart.model')

exports.findUserCart = async (userId) => {
    return await Cart.findOne({ user: userId })
}
exports.createCart = async (cartData) => {
    const cart = new Cart({ ...cartData })
    await cart.save()
    return cart
}
