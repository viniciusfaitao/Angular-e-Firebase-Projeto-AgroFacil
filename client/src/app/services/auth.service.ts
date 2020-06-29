import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    error: string;

    constructor(public afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router) { }

    async register(email: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user.user.email)
                this.error = "";
                firebase.auth().currentUser.sendEmailVerification();
            }).catch((err) => {
                console.log(err);
                if (err.message === "Password should be at least 6 characters") {
                    alert("A senha deve ter pelo menos 6 caracteres");
                } else if (err.message === "The email address is already in use by another account.") {
                    alert("O endereço de email já está sendo usado");
                }
            })
    }


    async loginEmailUser(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                if (user.user.emailVerified !== true) {
                    firebase.auth().currentUser.sendEmailVerification();
                    window.alert('Por favor, valide seu e-mail para acessar o conteudo!');
                    this.logout();
                } else {
                    this.ngZone.run(() => {
                        this.router.navigate(['/produtos']);
                    });
                    console.log(user.user.email)
                    this.error = "";
                }
            }).catch((err) => {
                console.log("An error ocurred");
                this.error = err.mensage;
            })
    }

    async loginFacebookUser() {
        let facebookProvider = await new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider)
            .then((user) => {
                if (user.user.emailVerified !== true) {
                    firebase.auth().currentUser.sendEmailVerification();
                    window.alert('Por favor, valide seu e-mail para acessar o conteudo!');
                    this.logout();
                } else {
                    this.ngZone.run(() => {
                        this.router.navigate(['/produtos']);
                    });
                    console.log(user.user.email)
                    this.error = "";
                }
            }).catch((err) => {
                if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
                    var googleProvider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(googleProvider)
                        .then((result) => {
                            var credential = result.credential;
                            var user = result.user;
                            if (credential && user) {
                                firebase.auth().currentUser.linkWithRedirect(facebookProvider)
                                console.log('Vinculated')
                            }
                        }).catch((err) => {
                            console.log("An error ocurred");
                            this.error = err.mensage;
                        });
                }
                console.log("An error ocurred");
                this.error = err.mensage;
            });
    }

    async loginGoogleUser() {
        let googleProvider = await new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((user) => {
                if (user.user.emailVerified !== true) {
                    firebase.auth().currentUser.sendEmailVerification();
                    window.alert('Por favor, valide seu e-mail para acessar o conteudo!');
                    this.logout();
                } else {
                    this.ngZone.run(() => {
                        this.router.navigate(['/produtos']);
                    });
                    console.log(user.user.email)
                    this.error = "";
                }
            });
    }

    async logout() {
        try {
            await this.afAuth.signOut();
        } catch (error) {
            console.log(error);
        }
    }

    isAuth() {
        return this.afAuth.authState.pipe(map(auth => auth));
    }


}