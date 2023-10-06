import IUser from "../inteface/usuarios.interface"
import { model, Schema } from "mongoose"

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
  });


  export default model<IUser>('usuarios', userSchema)