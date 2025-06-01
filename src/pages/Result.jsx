import Papa from "papaparse";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";

const PIXABAY_API_KEY = '50356379-59c32b1069edcc860059ac8af'

function Result() {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const region = routerLocation.state?.region;
  const currentLocation = routerLocation.state?.location;
  const exclude = routerLocation.state?.exclude;
  const desiredRegion = region;

  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // CSV読み込み（1回だけ）
  useEffect(() => {
    Papa.parse("spotlight.csv", {
      download: true,
      header: true,
      complete: (result) => {
        console.log("✅ CSVデータ:", result.data.length); // ←ここで中身確認
        setSpots(result.data);
      },
      error: (err) => {
        console.error("❌️ CSV読み込み失敗", err);
      },
    });
  }, []);

  // スポットの選出処理
  useEffect(() => {
    if (!region) {
      console.log("❌ regionが未設定");
      return;
    }
    // spots がまだセットされていない（空配列）のときは、読み込み待ち
    if (spots.length === 0) {
      console.log("⏳ spots 読み込み中…");
      return;
    }

    // ここまで到達すれば CSV のデータが入った後
    console.log("🚀 CSV読み込み完了、スポット選出開始");
    const filteredSpots = spots.filter((spot) => {
      const matchesRegion = region === "おまかせ" || spot.region === region;
      return matchesRegion && spot.name !== exclude;
    });
    // console.log("フィルター後の件数:", filteredSpots.length);

    if (filteredSpots.length === 0) {
      console.warn("⚠️ 該当スポットが見つかりませんでした");
      return;
    }

    const randomSpot =
      filteredSpots[Math.floor(Math.random() * filteredSpots.length)];
    console.log("選出されたスポット:", randomSpot);
    setSelectedSpot(randomSpot);
    localStorage.setItem("randomSpot", JSON.stringify(randomSpot));
  }, [region, exclude, spots]);

  useEffect(() => {
    if(!selectedSpot) return;
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}` +
          `&q=${encodeURIComponent(selectedSpot.spot)}` +
          `&image_type=photo&per_page=3`
        );
        const data = await res.json();
        setImageUrl(data.hits[0]?.webformatURL || "");
      } catch(e) {
        console.error("Pixabay 画像取得エラー:", e);
      }
    };
    fetchImage();
  }, [selectedSpot]);




  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <a href="/" alt="ラントリトップページ" font-color="black">ラントリ</a>
      <h2>選ばれたのは...</h2>
      <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
        {selectedSpot
          ? `${selectedSpot.name} ${selectedSpot.spot}`
          : "読み込み中..."}
      </h1>

      {selectedSpot ? (
        <div className="map-media-wrapper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={selectedSpot.spot}
              onError={(e) => {
                e.target.src = "/images/default.jpg";
              }}
              style={{
                width: "600px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          ) : (
            <p>画像入手不可</p>
          )}

          <iframe
            title="Google Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${selectedSpot.name}  ${selectedSpot.spot}`
            )}&output=embed`}
            className="place-map"
            loading="lazy"
            allowFullScreen
          />
        </div>
      ) : (
        <p>画像入手不可</p>
      )}

      <p style={{ marginTop: "1.5rem" }}>
        あなたの現在地: {currentLocation || "不明"}
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("randomSpot");
          navigate("/roulette", {
            state: {
              region: region, // 行きたい地方
              location: currentLocation, // 現在地（表示用）
              exclude: selectedSpot.spot, // 前回のスポットを除外
            },
          });
        }}
      >
        行ったことがあるのでもう一度選ぶ
      </button>

      <button
        onClick={() => {
          navigate("/detail", {
            state: {
              name: selectedSpot.name,
              spot: selectedSpot.spot,
            },
          });
        }}
      >
        ここに決定
      </button>

      {selectedSpot && (
        <div style={{ marginTop: "1.5rem" }}>
          <a
            href={`https://www.instagram.com/explore/tags/${encodeURIComponent(selectedSpot.spot)}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "white",
              color: "black",
              textDecoration: "none",
            }}
          >
            Instagramで{selectedSpot.spot}について調べる
          </a>
        </div>
      )}
    </div>
  );
}

export default Result;
