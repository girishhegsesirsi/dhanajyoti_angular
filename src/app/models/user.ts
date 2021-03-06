/*The user model is a small class that defines the properties of a user. The token property is used to hold the JWT token that is returned from the api on successful authentication.*/

export class User {

    username: string;
    password: string;
    role: string;

}
