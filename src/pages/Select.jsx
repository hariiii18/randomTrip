import { useState } from "react";
import { useNavigate } from "react-router-dom";

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都県",
  "大阪県",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
  "現在地不明",
];

const regions = [
  "おまかせ",
  "北海道地方",
  "東北地方",
  "関東地方",
  "中部地方",
  "近畿地方",
  "中国地方",
  "四国地方",
  "九州地方",
  "沖縄地方",
];

function SelectPage() {
  const [currentLocation, setCurrentLocation] = useState("");
  // const [region, setRegion] = useState(""); // "国内" or "海外"
  const [desiredRegion, setDesiredRegion] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>旅行をはじめる前に…</h2>

      {/* 都道府県のセレクトボックス */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label>現在地を選んでください：</label>
        <select
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        >
          <option value="">-- 都道府県を選択 --</option>
          {prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
        <br />
        <label>行きたい地方を選んでください：</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">-- 地方を選択 --</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* 国内 or 海外の選択肢
      <div style={{ marginBottom: "2rem" }}>
        <p>行きたい場所</p>
        <label>
          <input
            type="radio"
            name="region"
            value="国内"
            checked={region === "国内"}
            onChange={(e) => setRegion(e.target.value)}
          />
          国内
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="region"
            value="海外"
            checked={region === "海外"}
            onChange={(e) => setRegion(e.target.value)}
          />
          海外
        </label>
      </div> */}

      {/* 選択確認 */}
      {currentLocation && regions && (
        <p>
          選択中の現在地：<strong>{currentLocation}</strong>
          <br />
          行き先カテゴリ：<strong>{selectedRegion}</strong>
        </p>
      )}

      {/* スタートボタン（仮） */}
      <button
        disabled={!currentLocation || !selectedRegion}
        onClick={() => {
          navigate("/roulette", {
            state: {
              region: selectedRegion,
              location: currentLocation,
            },
          });
        }}
      >
        スタート！
      </button>
    </div>
  );
}

export default SelectPage;
