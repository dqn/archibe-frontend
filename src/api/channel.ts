import { client } from './client';

export async function getChannel(channelId: string) {
  const res = await client.get(`/channels/${channelId}`);
  console.log(res);
}
