// src/Detail.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PIXABAY_API_KEY = '50356379-59c32b1069edcc860059ac8af'

export default function Detail() {
  const location = useLocation();
  console.log("Detail location.state:", location.state);
  const { name, spot, mission } = location.state || {};

  const [jalanUrl, setJalanUrl] = useState("");

  useEffect(() => {
    if (!name || !spot) return;

    const keyword = `${name} ${spot}`;
    
    // 環境に応じてAPIエンドポイントを選択
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // ローカル版：Vite の proxy (/api → localhost:4000) を通す
      fetch(
        `/api/encode-keyword?name=${encodeURIComponent(name)}&spot=${encodeURIComponent(spot)}`,
        { cache: 'no-store' }
      )
      .then(res => {
        console.log('raw status', res.status);
        return res.json();
      })
      .then(data => {
        console.log('got data', data);
        setJalanUrl(data.url);
      })
      .catch(console.error);
    } else {
      // 本番版：クライアントサイドでエンコード
      try {
        const sjisArray = Encoding.stringToCode(keyword);
        const sjisBuffer = Encoding.convert(sjisArray, "SJIS", "UNICODE");
        const sjisEncoded = sjisBuffer
          .map((b) => "%" + b.toString(16).toUpperCase().padStart(2, "0"))
          .join("");

        const baseUrl = "https://www.jalan.net/uw/uwp2011/uww2011init.do";
        const params =
          `keyword=${sjisEncoded}` +
          `&distCd=06` +
          `&rootCd=7701` +
          `&screenId=FWPCTOP` +
          `&ccnt=button-fw` +
          `&image1=`;

        const url = `${baseUrl}?${params}`;
        setJalanUrl(url);
      } catch (error) {
        console.error('エンコードエラー:', error);
        // フォールバック：エンコードなしでURL生成
        const fallbackUrl = `https://www.jalan.net/uw/uwp2011/uww2011init.do?keyword=${encodeURIComponent(keyword)}&distCd=06&rootCd=7701&screenId=FWPCTOP&ccnt=button-fw&image1=`;
        setJalanUrl(fallbackUrl);
      }
    }
  }, [name, spot]);

  const shareText = encodeURIComponent(
    `あなたの行き先は ${name} の ${spot} に選ばれました✈️`
  );
  const shareUrl = encodeURIComponent(
    "https://rantori.com"
  );

  const shareMission = encodeURIComponent(
    `${spot}で「${mission}」に挑戦します！`
  );

  const tweetHref =
    mission === "自由行動"
      ? `https://twitter.com/intent/tweet?text=${shareText}%0A${shareUrl}`
      : `https://twitter.com/intent/tweet?text=${shareText}%0A${encodeURIComponent(
        `${spot}周辺で「${mission}」に挑戦します！ #ラントリ`
        )}%0A${shareUrl}`;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>目的地：{spot}</h2>
      {mission === "自由行動" ? (
        <p>自由行動！思い思いに散策してみてください！</p>
      ) : (
        <p>ミッション：{mission}</p>
      )}

      {jalanUrl ? (
        <a href={jalanUrl} target="_blank" rel="noopener noreferrer">
          じゃらんで詳しく見る →
        </a>
      ) : (
        <p>リンクを準備中…</p>
      )}

      

      <div>
        {/* X（旧Twitter）でシェアするリンク */}
          <a
          href={tweetHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: "1rem" }}
          background=''
          >
            Xでシェア
          </a>

        {/* LINEでシェアするリンク（新たに追加） */}
        <a
          href={`https://line.me/R/msg/text/?${shareText}%0A${shareUrl}`} // 新たに追加
          target="_blank"
          rel="noopener noreferrer"
        >
          LINEでシェア
        </a>
      </div>

      {/* <div>
      <h3>教えて下さい！あなたが行った中で思い出に残った旅行先</h3>
      <p>あなたが行った中で一番記憶に残った旅行先を教えて下さい</p>
      <p>入力いただいた旅行先はランダム旅行先の候補先として追加します</p>

      <p>都道府県：<input type="text" /></p>
      <p>観光スポット：<input type="text" /></p>
      <button>送信</button>
      </div> */}
    </div>
  );
}
