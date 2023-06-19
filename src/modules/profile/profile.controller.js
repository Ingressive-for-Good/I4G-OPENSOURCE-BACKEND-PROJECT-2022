const { findUser, updateUser, deleteUser } = require('../user/user.service')
const { hashPassword } = require('../../utils/helpers')
const cloudinary = require('../../utils/cloudinary')

async function getProfile(req, res) {
    const { _id } = req.user
    try {
        const user = await findUser(_id)
        const {
            fullname,
            email,
            profilePicture,
            phone,
            address,
            accountNumber,
            accountName,
            bank,
        } = user
        res.status(200).send({
            success: true,
            data: {
                fullname,
                email,
                profilePicture,
                phone,
                address,
                accountNumber,
                accountName,
                bank,
            },
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        })
    }
}

async function updateProfile(req, res) {
    const { _id } = req.user
    try {
        const user = await findUser(_id)
        const updateInfo = req.body
        if (updateInfo.password) {
            updateInfo.password = hashPassword(updateInfo.password)
        }
        updateInfo.profilePicture = req.file
        if (updateInfo.profilePicture) {
            if (user.profilePicture.imgId) {
                await cloudinary.uploader.destroy(user.profilePicture.imgId)
            }
            const imageData = await cloudinary.uploader.upload(
                updateInfo.profilePicture.path,
                {
                    folder: 'Profile-Pictures',
                }
            )
            updateInfo.profilePicture.imgUrl = imageData.secure_url
            updateInfo.profilePicture.imgId = imageData.public_id
        }
        await updateUser(_id, updateInfo)
        res.status(200).json({
            success: true,
            message: 'profile update successful',
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

async function deleteAccount(req, res) {
    const { _id } = req.user
    try {
        const user = await findUser(_id)
        if (user.profilePicture.imgId) {
            await cloudinary.uploader.destroy(user.profilePicture.imgId)
        }
        await deleteUser(_id)
        res.status(200).send({
            success: true,
            message: 'Account deletion successful',
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message,
        })
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount,
}
