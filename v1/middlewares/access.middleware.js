export const accessMiddleware = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).send('No tienes permisos para esta acción');
        }
        next();
    };
}
