import { handleVeresiyeRequest, type VercelRequest, type VercelResponse } from '../../server/veresiye-proxy';

export default function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  return handleVeresiyeRequest('veresiye-portal-admin', req, res);
}
