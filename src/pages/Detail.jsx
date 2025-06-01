// src/Detail.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const location = useLocation();
  console.log("Detail location.state:", location.state);
  const {name, spot} = location.state || {};

  const [jalanUrl, setJalanUrl] = useState("");

  useEffect(() => {
    if (!name || !spot) return;

    // ※ローカル版
    // Vite の proxy (/api → localhost:4000) を通す
    // fetch(
    //   `/api/encode-keyword?name=${encodeURIComponent(name)}&spot=${encodeURIComponent(spot)}`,
    //   { cache: 'no-store' }
    // )
      // .then(res => {
      //   console.log('raw status', res.status);
      //   return res.json();
      // })
      // .then(data => {
      //   console.log('got data', data);
      //   setJalanUrl(data.url);
      // })
      // .catch(console.error);

      // ※サイト版
      const baseUrl = 'https://www.jalan.net/uw/uwp2011/uww2011init.do';
    const params = new URLSearchParams({
      keyword: keyword,
      distCd: '06',
      rootCd: '7701',
      screenId: 'FWPCTOP',
      ccnt: 'button-fw',
      image1: ''
    });
    const url = `${baseUrl}?${params.toString()}`;
    setJalanUrl(url);
    }, [name, spot])


  const shareText = encodeURIComponent(`${name} の ${spot} が選ばれました✈️`);
  const shareUrl  = encodeURIComponent("https://hariiii18.github.io/randomTrip/");
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>目的地：{spot}</h2>
      {jalanUrl
        ? (
          <a href={jalanUrl} target="_blank" rel="noopener noreferrer">
            じゃらんで詳しく見る →
          </a>
        )
        : <p>リンクを準備中…</p>
      }

      <div>
      {/* X（旧Twitter）でシェアするリンク */}
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: "1rem" }}
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