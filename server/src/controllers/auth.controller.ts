import { signupService, signinService, refreshService , logoutService } from "@/services/auth.service";
import { Request, Response, NextFunction } from "express";

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: username, email, password"
            });
        }

        const result = await signupService({ username, email, password });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const deviceInfo = req.headers['user-agent'];
        const ipAddress = req.ip;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: email, password"
            });
        }

        const result = await signinService({ email, password, deviceInfo, ipAddress });

        if (!result.success) {
            return res.status(401).json(result);
        }

        res.cookie("refresh_token", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: result.message,
            user: result.user,
            accessToken: result.accessToken,
        });
    } catch (error) {
        next(error);
    }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Missing required field: refreshToken"
            });
        }
        const result = await refreshService({ refreshToken });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await logoutService(refreshToken);
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}