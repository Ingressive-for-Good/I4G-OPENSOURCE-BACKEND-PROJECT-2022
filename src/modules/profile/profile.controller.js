const userModel = require('../user/user.model')

async function getProfile(req, res) {
    const { _id } = req.user
    try {
        const user = await userModel.findById(_id)
        const { name, email, profilePicture, phone, address } = user
        res.status(200).json({
            name,
            email,
            profilePicture,
            phone,
            address,
        })
    } catch (err) {
        res.status(404).json({ status: false, message: 'An error has ocurred' })
    }
}

async function updateProfile(req, res) {
    const { _id } = req.user
    try {
        const updateInfo = req.body
        const user = await userModel.findByIdAndUpdate(_id, updateInfo)
        res.status(204).json({
            status: true,
            message: 'profile update successful',
        })
    } catch (err) {
        res.status(400).json({ status: false, message: 'An error has ocurred' })
    }
}

async function deleteAccount(req, res) {
    const { _id } = req.user
    try {
        const user = await userModel.findByIdAndDelete(_id)
        res.status(204).json({
            status: true,
            message: 'Account deletion successful',
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'Could not delete user',
        })
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount,
}
