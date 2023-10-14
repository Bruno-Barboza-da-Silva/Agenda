import { Document } from "mongoose"

// 1. Create an interface representing a document in MongoDB.
export default interface IEvent extends Document {
    evento: string; 
    hora: string; 
    data: string; 
    outros: string; 
    cor: string;
    email_usuario: string;
}


