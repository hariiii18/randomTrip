import { useLocation } from "react-router-dom";

function Detail() {
  const {name, spot} = useLocation().state || {};
  const [jalanUrl, setJalanUrl] = useState("");


  // 旅行サイト検索用リンク（例：じゃらんで検索）
  useEffect(() => {
    if (!name || !spot) return;
    fetch(
      `/api/encode-keyword?name=${encodeURIComponent(name)}&spot=${encodeURIComponent(spot)}`
    )
      .then(res => res.json())
      .then(data => setJalanUrl(data.url))
      .catch(console.error);
  }, [name, spot]);


  const shareText = encodeURIComponent(`${name} の ${spot} に行ってみよう！`);
  const shareUrl = encodeURIComponent(window.location.href);



  return (
    <div style={{ textAlign: "center", padding: "2rem"}}>
      <h2>{spot}に行く</h2>

      {/* 旅行サイトへのリンク */}
      {jalanUrl
        ? (
          <a href={jalanUrl} target="_blank" rel="noopener noreferrer">
            じゃらんで詳しく見る→
          </a>
        )
        : <p>リンクを準備中…</p>
      }


            {/* SNS でシェア */}
      <div style={{ marginTop: "2rem" }}>
        {/* Twitterシェア */}
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: "1rem", background: "black" }}
        >
          Xでシェア
        </a>

        {/* LINE シェア */}
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LINEでシェア
        </a>
      </div>
    </div>
  );
}

export default Detail;