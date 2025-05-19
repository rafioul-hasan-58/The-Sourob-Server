import { model, Schema } from "mongoose";


const adminSchema = new Schema<IAdmin>({
    name: { type: String, required: true },
    role: { type: String, enum: ['admin'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    phone: { type: String }
},
    {
        timestamps: true
    }
)

export const AdminModel = model<IAdmin>("Admin", adminSchema);