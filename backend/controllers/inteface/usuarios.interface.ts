import { Document } from "mongoose"

// 1. Create an interface representing a document in MongoDB.
export default interface IUser extends Document {
    nome: string;
    email: string;
    senha: string;
}