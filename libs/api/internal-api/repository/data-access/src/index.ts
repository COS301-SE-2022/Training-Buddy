export * from './lib/api-internal-api-repository-data-access.service';
export * from './lib/api-internal-api-repository-data-access.module';
import { Observable } from 'rxjs';

import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';

const repo = new ApiInternalApiRepositoryDataAccessService() ;

export const scheduledWorkoutsWatch = new Observable((subscriber) => {
    repo.scheduledWorkoutCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})

export const activityLogsWatch = new Observable((subscriber) => {
    repo.activityLogsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})

export const workoutInvitesWatch = new Observable((subscriber) => {
    repo.workoutInvitesCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})

export const buddyRequestsWatch = new Observable((subscriber) => {
    repo.buddyRequestsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})

export const buddyConnectionsWatch = new Observable((subscriber) => {
    repo.buddyConnectionsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})

export const usersWatch = new Observable((subscriber) => {
    repo.usersCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            subscriber.next(doc.data()) ;
        })
    });
})         