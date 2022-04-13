import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../lib/auth0";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await auth0.handleLogout(req, res);
    } catch (error) {
        console.error(error);
        // @ts-ignore
        res.status(error.status || 500).end(error.message);
    }
}