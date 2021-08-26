import { HttpErrors } from '@loopback/rest'
import { promisify } from 'util'
import { UserProfile, securityId } from '@loopback/security'
import { inject } from '@loopback/core'
import { TokenServiceBindings } from '../keys'
const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)
export class JWTService  {


    @inject(TokenServiceBindings.TOKEN_SECRET)
    public readonly jwtSecret: string;
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    public readonly jwtExpiresIn: string;
    async generateToken(userProfile: UserProfile): Promise<string> {

        if (!userProfile) {
            throw new HttpErrors.Unauthorized("Error while generating token: User Profile is null")
        }
        let token = '';
        try {
            token = signAsync(userProfile.toJSON(), this.jwtSecret, {
                expiresIn: this.jwtExpiresIn
            }) 
        }
        catch (err) {
            throw new HttpErrors.Unauthorized(`Error while generating token: ${err}`)
        }
        return token;
    }

}