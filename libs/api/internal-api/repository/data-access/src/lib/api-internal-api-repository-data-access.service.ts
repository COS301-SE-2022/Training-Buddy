import { Injectable, Param } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { UserDto, ActivityStat } from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import * as admin from 'firebase-admin'
import { emit } from 'process';
import internal = require('stream');

@Injectable()
export class ApiInternalApiRepositoryDataAccessService {

    async findAll(){
        const firestore = new admin.firestore.Firestore() ;
        return await firestore.collection('/Users').get() ;
    }

}
