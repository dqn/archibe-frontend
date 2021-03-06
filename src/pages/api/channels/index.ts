import { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../client';

export default (req: NextApiRequest, res: NextApiResponse) => {
  client.get('/api/channels', { params: req.query }).then((data) => res.status(200).json(data));
};
