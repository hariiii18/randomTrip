import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', justifyContent: 'center'}}>
      <h1>ようこそ！<br />ラントリへ</h1>
      <p>さぁまだ見ぬ場所へ</p>
      <Link to="/select">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem'}}>
          ランダムで旅行先を選ぶ
        </button>
      </Link>
      <br />
      <Link to="/reason" style={{ fontSize: "1rem", color: "#646cff" }}>このサイトを作った理由</Link>
    </div>
  );
}

export default Home;