import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    //nos conectamos con el string de conexion que tenemos en las variables de entorno
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
