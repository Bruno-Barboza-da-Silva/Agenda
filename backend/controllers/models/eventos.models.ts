import IEvent from "../inteface/eventos.interface"
import { model, Schema } from "mongoose"

// 2. Create a Schema corresponding to the document interface.
const eventSchema = new Schema<IEvent>({
    evento: { type: String, required: true }, 
    hora: { type: String, required: true },
    data: { type: String, required: true },
    outros: { type: String },
    cor: { type: String, required: true },
    email_usuario: { type: String, required: true }
  });


  export default model<IEvent>('eventos', eventSchema)