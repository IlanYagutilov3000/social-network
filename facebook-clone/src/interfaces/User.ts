export interface User {
    _id? : string,
    firstname: string,
    lastname: string,
    birthday: number,
    birthMonth: number,
    birthYear: number,
    gender: string,
    email: string,
    password: string,
    profilePicture?: string
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserDetails {
    _id?: string,
    firstname: string,
    lastname: string,
    birthday?: number,
    gender: string,
    email: string,
    profilePicture: string
}