import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleVerify = async (idToken = '') => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const { name, email, picture } = ticket.getPayload()
    
    return { name, email, picture }
}

export default googleVerify