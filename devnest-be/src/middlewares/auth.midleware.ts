import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express";

export interface AuthRequest extends Request {
	user?: any;
}
interface JwtPayload {
	userId: string;
	role: string;
}

export const protect = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
export const authorize = (...roles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			return res.sendStatus(403);
		}
		next();
	};
};

export const verifyAccessToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET!,
		) as JwtPayload;

		(req as any).user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: "Token expired or invalid" });
	}
};
