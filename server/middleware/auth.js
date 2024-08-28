import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
        jwt.verify(token, process.env.JWT_SECRET);
        next()
      } else {
        res.status(400).json({ message: "Access Denied" });
      }
    } else {
      res.status(400).json({ message: "Login Required" });
    }
  } catch (err) {
    res.status(400).json({ message: "Access Denied" });
  }
};


export const verifyAdminToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      if (token.startsWith("Bearer ")) {
      
        token = token.slice(7, token.length).trimLeft();
     
        const verified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        
        next()
      } else {
        res.status(400).json({ message: "Access Denied" });
      }
    } else {
      res.status(400).json({ message: "Login Required" });
    }
  } catch (err) {
    res.status(400).json({ message: "Access Denied" ,error:err.message});
  }
};
