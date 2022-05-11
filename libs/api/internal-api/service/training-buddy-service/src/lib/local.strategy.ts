import { Injectable , UnauthorizedException} from '@nestjs/common';
import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import { TrainingBuddyServiceService } from './training-buddy-service.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    /**
     * 
     * @param trainingBuddyServiceService 
     */
    constructor(private trainingBuddyServiceService: TrainingBuddyServiceService ){    
        super();
    }
    /**
     * 
     * @param email 
     * @param password 
     * @returns  UnauthorizedException || UserEntity
     */
    async validate(email: string , password: string): Promise<any>{
        const user = await this.trainingBuddyServiceService.validateUser(email , password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
