// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por tu clave secreta real

// /**
//  * Genera un token JWT.
//  * @param payload - Datos a incluir en el token (e.g., id, role).
//  * @param expiresIn - Tiempo de expiración del token (e.g., '1h', '7d').
//  * @returns El token generado.
//  */
// export const generateToken = (payload: Record<string, any>, expiresIn: string = '1h'): string => {
//     if (!SECRET_KEY) {
//         throw new Error('SECRET_KEY no está definida');
//     }

//     return jwt.sign(payload, SECRET_KEY, { expiresIn });
// };
