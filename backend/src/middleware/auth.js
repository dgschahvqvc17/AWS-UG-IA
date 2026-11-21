// Verifica tokens de acceso de Cognito (AWS JWT verify).
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const userPoolId = process.env.COGNITO_USER_POOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;
const requireAuth = process.env.REQUIRE_AUTH === 'true';

const verifier =
  userPoolId && clientId
    ? CognitoJwtVerifier.create({ userPoolId, clientId, tokenUse: 'access' })
    : null;

export const auth = async (req, res, next) => {
  if (!verifier) return next();

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    if (requireAuth) return res.status(401).json({ message: 'Token requerido' });
    return next();
  }

  try {
    req.user = await verifier.verify(token);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
