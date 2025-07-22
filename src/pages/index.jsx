import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', justifyContent: 'center'}}>
      <h1 style={{ fontSize: '35px' }}>ようこそ<br />ラントリへ！</h1>
      <h2 style={{ fontSize: '25px' }}>さぁまだ見ぬ場所へ出かけよう！</h2>
      <Link to="/select">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem', marginTop: '2rem' }}>
          ランダムで旅行先を選ぶ
        </button>
      </Link>
      <br />
      <Link to="/reason">
        <button style={{ fontSize: "1rem", color: "#646cff", marginTop: "1rem", color: "white" }}>
          このサイトを作った理由
        </button>
      </Link>
    </div>
  );
}

export default Home;