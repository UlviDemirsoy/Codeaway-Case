import * as firebaseCredentials from './firebase-credentials.json';

export const environment = {
    firebaseadmin: {
        databaseURL: `https://${(firebaseCredentials?.project_id ?? '')}.firebaseio.com`,
        credentials: firebaseCredentials,
    },
    PORT: 8081
    
}