import jwt from 'jsonwebtoken'

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        samSite: "strict"
    })
}

export default createTokenAndSaveCookie