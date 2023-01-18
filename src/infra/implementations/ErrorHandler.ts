import { NextFunction, Request, Response } from "express";

export default class ErrorHandler {
  public async execute(error: Error, req: Request, res: Response, next: NextFunction) {
    switch (error.name) {
      case 'OK': return res.status(200).json({ message: 'OK' })
      case 'Created': return res.status(201).json({ message: 'Created' })
      case 'NotFound': return res.status(404).json({ message: 'Not Found' })
      case 'BadRequest': return res.status(400).json({ message: 'Bad Request' })
      case 'NotAuthorized': return res.status(401).json({ message: 'Not authorized' })
      case 'InvalidCredentials': return res.status(403).json({ message: 'Invalid credentials' });
      case 'ServiceUnavailable': return res.status(503).json({ message: 'Service is unavailable' });
      default: return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}