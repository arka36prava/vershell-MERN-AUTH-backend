import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log('Cookies:', req.cookies);
  if (!token) {
    console.log('No token cookie present');
    return res.json({ success: false, message: "Not Authorised. Login again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', tokenDecode);
    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log('JWT verification error:', error.message);
    res.json({ success: false, message: error.message });
  }
};


export default userAuth;