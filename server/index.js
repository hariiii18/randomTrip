// server/index.js
import express from 'express';
import iconv from 'iconv-lite';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.get('/api/encode-keyword', (req, res) => {
  const { name = '', spot = '' } = req.query;
  const keyword = `${name} ${spot}`;
  
  // 1) Shift_JIS にエンコード
  const sjisBuffer = iconv.encode(keyword, 'Shift_JIS');
  // 2) バイトごとに %XX 形式に
  const sjisParam = Array.from(sjisBuffer)
    .map(b => '%' + b.toString(16).toUpperCase().padStart(2, '0'))
    .join('');
  
  // 3) 手動で URL を組み立てます（URLSearchParams は使わない）
  const baseUrl = 'https://www.jalan.net/uw/uwp2011/uww2011init.do';
  const params = 
    `keyword=${sjisParam}` +
    `&distCd=06` +
    `&rootCd=7701` +
    `&screenId=FWPCTOP` +
    `&ccnt=button-fw` +
    `&image1=`;
  
  const url = `${baseUrl}?${params}`;
  console.log('▶️ 実際に送る URL:', url);

  res.json({ url });
});

app.listen(port, () => {
  console.log(`⚡️ Server running on http://localhost:${port}`);
});