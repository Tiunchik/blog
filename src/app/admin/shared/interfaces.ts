export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponce {
  idToken: string;
  expiresIn: string;
}
