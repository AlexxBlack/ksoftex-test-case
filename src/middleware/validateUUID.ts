import { Request, Response, NextFunction } from 'express';
import { isValidUUIDV4 } from "is-valid-uuid-v4";

export function validateUUID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!isValidUUIDV4(id)) {
        return res.status(400).send('Id should be a valid UUID');
    }

    next(); // If id is OK - go further
}
