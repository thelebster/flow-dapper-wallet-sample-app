import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccountSignature } from '../../../lib/flow/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await verifyAccountSignature(req.body);
    return res.status(200).send(result); // true or false
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
}

export default handler;
