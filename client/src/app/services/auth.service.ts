import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    public user : User;

    constructor(public afAuth: AngularFireAuth) {}

    
    async register(email:string, password:string) {
        try{
            const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async loginEmailUser(email:string, password:string) {
        try{
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async loginFacebookUser(email:string, password:string) {
        try{
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async loginGoogleUser(email:string, password:string) {
        try{
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    async logout() {
        try{
            await this.afAuth.signOut();
        }catch(error){
            console.log(error);
        }
    }
}