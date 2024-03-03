
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    name: string;
    email: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface IQuery {
    getAllUsers(): User[] | Promise<User[]>;
    getUser(email: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUser: CreateUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
