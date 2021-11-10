import CryptoJS from 'crypto-js';
import { NextApiRequest, NextApiResponse } from 'next';
import Api from '@src/services/api';

export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const bookingResponse = await Api({
    method: 'patch',
    url: `/booking/${_req.body.orderNo}`,
    data: {
      status: String(_req.body.status).toLowerCase(),
    },
  });
  if (bookingResponse.data) {
    const encryptObj = CryptoJS.AES.encrypt(
      JSON.stringify({ ...bookingResponse.data }),
      String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)
    ).toString();
    const encryptData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptObj));
    res.status(200).writeHead(302, {
      Location: `/redirectCheckout?redirectData=${encryptData}`,
    });
    res.end();
  }
}
