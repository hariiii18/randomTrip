import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Roulette.css'

function Roulette() {
  const navigate = useNavigate();
  const location = useLocation(); // ← React Router の location（ややこしい）
  const selectedRegion = location.state?.region;
  const currentLocation = location.state?.location;
  const exclude = location.state?.exclude || null;

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
  const randomStart = Math.floor(Math.random() * 360); // 0〜359
  const extraRotation = 360 * (Math.floor(Math.random() * 4) + 2);// 720〜1800
  const totalRotation = randomStart + extraRotation;

  setRotation(totalRotation);

    const timeout = setTimeout(() => {
      navigate('/result', { state: {
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
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
    </div>
  );
}

export default Roulette;
