// pages/api/encode-keyword.js
import iconv from 'iconv-lite';

export default function handler(req, res) {
  const { name = '', spot = '' } = req.query;
  const keyword = `${name} ${spot}`;

  // Shift_JIS にエンコード
  const sjisBuffer = iconv.encode(keyword, 'Shift_JIS');

  // バイト単位で %XX エンコード
  const sjisParam = Array.from(sjisBuffer)
    .map(b => '%' + b.toString(16).toUpperCase().padStart(2, '0'))
    .join('');

  const baseUrl = 'https://www.jalan.net/uw/uwp2011/uww2011init.do';
  const params = new URLSearchParams({
    keyword: sjisParam,
    distCd: '06',
    rootCd: '7701',
    screenId: 'FWPCTOP',
    ccnt: 'button-fw',
    image1: ''
  });

  res.status(200).json({ url: `${baseUrl}?${params.toString()}` });
}