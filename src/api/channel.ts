import { client } from './client';

export async function getChannel(channelID: string) {
  const res = await client.get(`/channels/${channelID}`);
  console.log(res);
}
