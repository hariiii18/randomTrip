import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Roulette.css'


function Roulette() {
  const navigate = useNavigate(); //ページに遷移するときにデータを受け渡すときに使用
  const location = useLocation(); // 遷移前の画面から渡されたstate情報を受け取るために
  const selectedRegion = location.state?.region; //前データから取得した地域情報を受け取るために
  const currentLocation = location.state?.location; //前データから取得した現在地情報を受け取るために
  const exclude = location.state?.exclude || null;
  const [rotation, setRotation] = useState(0); //ルーレット状態を保存する場所

  useEffect(() => {
  const randomStart = Math.floor(Math.random() * 360); // 0〜359
  const extraRotation = 360 * (Math.floor(Math.random() * 4) + 2);// 720〜1800
  const totalRotation = randomStart + extraRotation;

  setRotation(totalRotation);

    const timeout = setTimeout(() => {
      navigate('/result', { state: {  //navigate(第1引数:'遷移したいパス', 第2引数:遷移先に渡したい情報)
        region: selectedRegion,
        location: currentLocation,
        exclude: exclude,
      } });
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, [navigate, selectedRegion, currentLocation, exclude,]);

  return (
    <div className="roulette-container">
      <h2>旅行先を決定中...</h2>
      <div className='roulette-body'>
        <div className='pointer' />
        <div className="spinning-wheel"
          style={{ transform: `rotate(${rotation}deg)`, }}
        />
      </div>
    </div>
  );
}

export default Roulette;
