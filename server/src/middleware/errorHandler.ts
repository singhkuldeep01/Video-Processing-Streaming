import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/error/app.error";
import { Prisma } from "@prisma/client";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let isOperational = false; // Flag to identify if this is a known, safe-to-reveal error
    
    // 1. Check if it's our custom AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = true;
    } 
    // 2. Handle Prisma Database-specific errors
    // @ts-ignore
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        isOperational = true;
        if (err.code === 'P2002') {
            // Unique constraint violation (e.g. email/username duplicate)
            statusCode = 409;
            const target = (err.meta?.target as string[])?.join(', ') || 'field';
            message = `A record with this ${target} already exists.`;
        } else if (err.code === 'P2025') {
            // Record not found
            statusCode = 404;
            message = 'Requested record not found.';
        } else {
            // Generic Prisma error
            statusCode = 400;
            message = 'Database operation failed.';
        }
    } 
    // 3. Fallback for other JS Error types (e.g. SyntaxError, TypeError)
    else if (err instanceof Error) {
        message = err.message;
    }
    
    // 4. Log severe, unexpected errors (500s) on the server console
    if (statusCode === 500) {
        console.error("🔥 SYSTEM ERROR:", err);
    }

    // 5. Send clean response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        // In production, mask generic/internal 500 errors to avoid leaking details
        message: (isOperational || process.env.NODE_ENV === 'development') 
            ? message 
            : 'Something went wrong on our end. Please try again later.',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    
    return; // Important: prevent further execution
};