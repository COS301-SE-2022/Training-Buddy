import { ExtractJwt , Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable} from '@nestjs/common'
@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hide', //TODO hide this in evn secrets
        });
    }
    /**
     * 
     * @param payload 
     * @returns 
     */
    async validate(payload : any){ 
        return { email: payload.email, username: payload.username};
    }
}
