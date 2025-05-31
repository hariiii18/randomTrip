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

    // Vite の proxy (/api → localhost:4000) を通す
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
    }, [name, spot])


  const shareText = encodeURIComponent(`${name} の ${spot} が選ばれました✈️`);
  const shareUrl  = encodeURIComponent("https://hariiii18.github.io/travel-picker-copy/");
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

    </div>
  );
}