import jwt from "jsonwebtoken";

export const authorizationMiddleware = (req, res, next) => {
  //tenemos que recibir el token de algun lado, como los headers
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({
      message: "No se proporcionó un header de autenticación",
    });
  }

  //el token viene en formato "Bearer token", por eso lo separo y tomo la segunda parte
  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token de autenticación no válido",
    });
  }

  //verificamos el token haciendo uso de la clave secreta
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    //si se retorna un error, es porque el token no es valido
    if (err) {
      return res.status(401).json({ message: "Token invalido" });
    }
    //si el token es valido, guardamos la informacion del token en req.user para usarla en las rutas protegidas
    req.user = decoded;
    next();
  });
};
