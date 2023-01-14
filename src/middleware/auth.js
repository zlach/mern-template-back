// import jwt from 'jsonwebtoken';
// import jwkToPem from 'jwk-to-pem';
import User from '../models/user.model.js'
import CustomError from '../utils/custom-error.js';
// import jwks from '../../jwks.js';
import logger from '../utils/logger.js';
import { UserRoles } from '../utils/constants.js';

const verifyTokenAndGetSub = async token => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_USER_POOL,
    tokenUse: "id",
    clientId: process.env.AWS_CLIENT_ID,
  });
  
  try {
    const { sub } = await verifier.verify(token);

    return sub
  } catch (error) {
    logger.info('FAIL: verifyTokenAndGetSub');
    logger.info(error);

    return false
  }
}

// ===The implementation below requires a jwks.json file===
// const verifyTokenAndGetSub = token => {
//   const { header } = jwt.decode(token, { complete: true });
//   const jwk = jwks.keys.find(j => j.kid === header.kid);
  
//   if (!jwk) {
//     return false;
//   }

//   const pem = jwkToPem(jwk);

//   try {
//     const { sub } = jwt.verify(token, pem, { algorithms: ['RS256'] })

//     return sub;
//   } catch (error) {
//     logger.info('FAIL: verifyTokenAndGetSub');
//     logger.info(error);

//     return false;
//   }
// }

const verifyTokenAndGetUser = async token => {
  const jwtToken = typeof token === 'string' && token.startsWith('Bearer') && token.substring(7);
  let sub;
  let user;

  if (jwtToken) {
    sub = verifyTokenAndGetSub(jwtToken);
  }

  if (!sub) {
    return false;
  }

  try {
    user = await User.findOne({ cognitoId: sub })
  } catch (err) {
    return false;
  }

  if (!user) {
    return {
      role: UserRoles.CreateProfile // TODO: re-evaluate whether this role is necessary (will we need public user creation route?)
    };
  }

  return user;
}

export const customAuth = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development' && req.hostname === 'localhost') {
    req.user = {
      role: UserRoles.SystemAdmin
    }

    return next()
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomError.forbidden());
  }

  const user = await verifyTokenAndGetUser(authHeader)

  if (!user) {
    return next(CustomError.unauthorized());
  }

  req.user = user;

  return next();
}