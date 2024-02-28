import jwt from 'jsonwebtoken'
import Usuario from '../users/user.model.js'

export const validarJWT = async(req, res, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try {
        //verificacion de token
        const { udi } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        //verificar que el usuario exista
        if (!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            })
        }
        //varificar si el uid esta habilitado
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (e) {
        console.log(e),
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}