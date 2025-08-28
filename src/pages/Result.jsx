import Papa from "papaparse";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";

const PIXABAY_API_KEY = '50356379-59c32b1069edcc860059ac8af'

// --- 新たに追加：汎用ミッションの配列 ---
// 将来的には CSV/DB で読み込んでもOK
const missions = [
  "地元の人におすすめの郷土料理を聞いて、それを食べてみよう!ついでにその料理のお店の外観写真を撮って、SNSにアップしてみよう!",
  "駅前の観光案内所で地図をもらい、気になるスポットを３つピックアップして歩いてみよう!",
  "町の小さなお土産屋さんで地元の名産品を手にとって、店員さんにおすすめを聞いてみよう!",
  "歴史あるお寺や神社のおみくじを引いて、結果をその場で写真に撮って眺めてみよう!",
  "公園や広場で咲いている花を見つけたら、スマホで名前を調べてメモしてみよう!",
  "商店街を歩きながら、アート作品（壁画や看板など）を３つ探して写真に残そう!",
  "古い建物（レトロな洋館や蔵など）を探して、その前で「タイムスリップしたみたい！」というポーズで写真を撮ろう!",
  "地元で愛されているコンビニやお弁当屋さんに入って、そこでしか売っていないスイーツを探してみよう!",
  "道の駅やサービスエリアに寄って、売っている地元野菜を１つ買ってみよう!",
  "駐車場や駅の近くでレンタサイクルを見つけたら、30分だけ借りて近隣をサイクリングしてみよう!",
  "お祭りやイベントポスターが貼ってあったら、開催日時をチェックしてカレンダーにメモしてみよう!",
  "海や川のそばで小石を拾って、「これだ！」と思う形のものを探してみよう!",
  "そのエリアで昔から続いているパン屋さんに入って、店員さんに人気のパンを聞いて購入してみよう!",
  "商店街の古い看板（手書きやレトロなロゴ）を３つ探してスマホに収めよう!",
  "人気のない小路（路地）に入って「地元のゴーストタウン探検隊」になったつもりで散策してみよう!",
  "街角にあるベンチに座って、通りかかる人に「天気がいいですね」と声をかけてみよう!",
  "ローカルな書店や古本屋をのぞいて、気になる本を１冊立ち読みしてみよう!",
  "地元のカフェで「その店の一押しドリンク」を注文し、味の感想をメモに残してみよう!",
  "観光案内所で無料のガイドマップを受け取り、推奨ルートをそのまま１周ウォーキングしてみよう!"
];

function Result() {
  const navigate = useNavigate(); //ページに移るときにデータを渡すときに使用
  const routerLocation = useLocation();
  const region = routerLocation.state?.region;
  const currentLocation = routerLocation.state?.location;
  const exclude = routerLocation.state?.exclude;
  const desiredRegion = region;

  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedMission, setSelectedMission] = useState("");
  const [missionCard, setMissionCard] = useState("");
  const [acceptedMission, setAcceptedMission] = useState(null);

  // CSV読み込み（1回だけ）
  // useEffectの主な役割         useEffect(第1引数:実行したい関数, 第2引数:[依存配列（値が変わったときだけ再実行)])
  // ・データの取得
  // ・イベントリスナーの登録
  // ・ローカルストレージの読み書き
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

    {selectedMission && (
      <div style={{ marginTop: "2rem" }}>
        <h3>今日のミッション:</h3>
        <p>{selectedMission}</p>
      </div>
    )}

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
  }, [region, exclude, spots ]);  // 条件等を元に該当スポットをランダムで抽出

  // --- スポット＆ミッションを選ぶ useEffect の中 ---
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * missions.length);
    const mission = missions[randomIndex];
    if (!selectedSpot) return;
    console.log(`選ばれたミッションカード: ${mission}`);
    setMissionCard(mission);
    setAcceptedMission(null);
  }, [selectedSpot]);

  useEffect(() => {
  if (!selectedSpot) return;

  const fetchImage = async () => {
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}` +
        `&q=${encodeURIComponent(selectedSpot.spot)}` +
        `&image_type=photo&per_page=3`  // ← per_page を 3 に変更
      );
      const data = await res.json();

      if (Array.isArray(data.hits) && data.hits.length > 0) {
        // 3件の結果からランダムに１つ選ぶ
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        setImageUrl(data.hits[randomIndex].webformatURL);
      } else {
        setImageUrl("");
      }
    } catch (e) {
      console.error("Pixabay 画像取得エラー:", e);
      setImageUrl("");
    }
  };

  fetchImage();
}, [selectedSpot]);




  return (
    <div style={{ textAlign: "center"}}>
      <h2>選ばれたのは...</h2>
      <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
        {selectedSpot
          ? `${selectedSpot.name} ${selectedSpot.spot}`
          : "読み込み中..."}
      </h1>

      {selectedSpot ? (
        <div className="map-media-wrapper">
          {imageUrl ? (
            <div className="image-with-note"> 
              <img
                src={imageUrl}
                alt={selectedSpot.spot}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                onError={(e) => {
                  e.target.src = "/images/default.jpg"; // 画像取得に失敗したときのフォールバック
                }}
              />
              <p style={{ marginTop: "4px", fontSize: "0.9rem", color: "#555" }}>
                ※現地と異なる画像が表示される場合があります
              </p>
            </div>
          ) : null}

          <div>
            <iframe
              title="Google Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${selectedSpot.name}  ${selectedSpot.spot}`
              )}&output=embed`}
              className="place-map"
              loading="lazy"
              allowFullScreen
              style={{
                width: "600px",
                height: "400px",
              }}
            />
          </div>
        </div>
      ) : (
        <p>画像入手不可</p>
      )}

      {selectedSpot && !acceptedMission && (
        <div className="mission-container">
          <h3>🃏 ミッションカード</h3>
          <div style={{
            width: "240px",
            height: "360px",
            background: "white",
            border: "8px, double, red",
            color: "black",
            borderRadius: "8px",
            alignContent: "center",
          }}>
            <p>{missionCard}</p>
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            あなたの現在地: {currentLocation || "不明"}
          </p>
          <div
          style={{
            marginTop: "2rem",
          }}>
            <button
            style={{ marginRight: "1rem", color: "white", }}
            onClick={() => {
              navigate("/detail", {
                state: {
                  name: selectedSpot.name,
                  spot: selectedSpot.spot,
                  mission: missionCard,
                }
              })
              setAcceptedMission(missionCard);
            }}
            >
              ミッションを受け取る
            </button>
            <button
            style={{ marginTop: "1rem", color: "white", }}
            onClick={() => {
              navigate("/detail", {
                state: {
                  name: selectedSpot.name,
                  spot: selectedSpot.spot,
                  mission: "自由行動",
                },
              });
            }}
            >
              ミッションを受け取らず自由行動する
            </button>
          </div>
        </div>
      )}

      <button
      style={{ marginTop: "1.5rem", color: "white", }}
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

      {selectedSpot && (
        <div style={{ marginTop: "1.5rem" }}>
          <button
            onClick={() => {
              window.open(`https://www.instagram.com/explore/tags/${encodeURIComponent(selectedSpot.spot)}/`, "_blank");
            }}
            rel="noopener noreferrer"
            style={{
              padding: "1rem",
              backgroundColor: "#1a1a1a",
              textDecoration: "none",
              color: "white",
              display: "inline-block",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          >
            Instagramで{selectedSpot.spot}について調べる
          </button>
        </div>
      )}
    </div>
  );
}

export default Result;
