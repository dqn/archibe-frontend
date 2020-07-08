import { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../client';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  client.get(`/api/channels/${id}`).then((data) => res.status(200).json(data));
};
