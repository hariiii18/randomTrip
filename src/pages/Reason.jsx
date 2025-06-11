import { Link } from "react-router-dom";
import "./Reason.css";

export default function Reason() {
  return (
    <div>
      <header style={{ textAlign: "center" }}>
        <a
          href="/randomTrip/"
          alt="ラントリトップページ"
          font-color="black"
        >
          ✈️ラントリ
        </a>
      </header>
      <div className="container">
        <h1 style={{ textAlign: "center", }}>
          みんなにも新しい地点にいって刺激をもらってほしい
        </h1>
        <div className="reason-text">
          <p style={{ marginBottom: "1rem" }}>
            その思いでこのサイトを作りました！<br />
            きっかけは大学４年生のとき、１ヶ月かけてひとりでヨーロッパを周遊したときのこと。<br />
            行きたい国や観光地はおおまかに決めていたものの、その地域の中で何をするかはまったく計画せず、気の向くままに歩き回っていました
          </p>

          <p style={{ marginBottom: "1rem" }}>
            ある日、イタリア🇮🇹・フィレンツェのミケランジェロ広場に到着<br />
            街を一望できるあの絶景を目にした瞬間、思わず胸が熱くなり、涙がこぼれました...😭✨<br />
            ガイドブックでは伝わりきらない、風景そのものが心に染み渡ったあの感動は、今でもはっきりと覚えています
          </p>

          <p style={{ marginBottom: "1rem" }}>
            さらに偶然行った場所で出会った現地の人たちと会話を交わすことで、まったく違った視点を手に入れ、自分の人生観が大きく変わりました。<br />
            旅行プランを細かく立てていれば楽しい旅にはなるでしょう。でも、あえてプランを立てずに訪れることで、“偶然の出会い”がもたらす大きな刺激を感じられることもある――私はまさにその体験を通じて価値観が変わったのです。
          </p>

          <p style={{ marginBottom: "1rem" }}>
            だからこそ、まだ見ぬ知らない場所へ足を運び、新たな風景や人との出会いから得られる刺激を、みなさんにも味わってほしいと思っています。<br />
            もちろん、目的地にたどり着くまでの道のりも旅の醍醐味です。目指す場所だけが旅ではなく、道中に感じる空気や匂い、出会いのすべてがあなたの旅を彩ってくれます。
          </p>

          <p style={{ marginBottom: "5rem" }}>
            もし途中で大きな刺激をもらわなくても、それもまた人生のひとつ。偶然の出会いは予測できない分だけ、ふとした瞬間に心が動かされる喜びがあります。<br />
            その思いを形にしたくて、「ラントリ」を作りました。
          </p>

          <p style={{ marginBottom: "1rem" }}>
            このサイトをきっかけに、あなたも“偶然に身をまかせた旅”を楽しんで、新しい視点を手に入れてほしいと願っています。
          </p>
        </div>
      </div>
      <div style={{ margin: '32px auto', textAlign: 'center', }}>
        <Link to="/select">
          <button style={{ padding: '1rem 2rem', fontSize: '1.2rem', }}>
            ランダムで旅行先を選ぶ
          </button>
        </Link>
      </div>

    </div>
  );
}