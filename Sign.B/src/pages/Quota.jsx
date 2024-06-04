import React, { useState, useEffect } from 'react';
import './Quota.css';

const Quota = () => {
  const [lottoData, setLottoData] = useState(null);
  const [predictedNumbers, setPredictedNumbers] = useState([]);
  const [hotNumbers, setHotNumbers] = useState([]);
  const [coldNumbers, setColdNumbers] = useState([]);
  const [numbersWithWeights, setNumbersWithWeights] = useState(null); // 각 숫자의 빈도수를 저장할 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000');
        const data = await response.json();
        const last50Results = data.slice(Math.max(data.length - 50, 0)); // 마지막 50개의 결과 가져오기
        setLottoData(last50Results);
        const counts = calculateNumbersWithWeights(last50Results);
        setNumbersWithWeights(counts); // 각 숫자의 빈도수 계산하여 상태에 저장
        setHotAndColdNumbers(counts);
        setPredictedNumbers(generatePredictedNumbers(counts));
      } catch (error) {
        console.error('Error fetching lotto data:', error);
      }
    };

    fetchData();
  }, []);

  // 숫자의 빈도수를 계산하는 함수
  const calculateNumbersWithWeights = (data) => {
    const counts = Array.from({ length: 45 }, (_, i) => ({ number: i + 1, weight: 1 }));
    data.forEach(result => {
      const drawnNumbers = [result.drwtNo1, result.drwtNo2, result.drwtNo3, result.drwtNo4, result.drwtNo5, result.drwtNo6];
      drawnNumbers.forEach(number => {
        counts[number - 1].weight += 1;
      });
    });
    return counts;
  };

  // 핫 넘버와 콜드 넘버를 선택하는 함수
  const setHotAndColdNumbers = (counts) => {
    const sortedCounts = [...counts].sort((a, b) => a.weight - b.weight);
    const coldNumbers = sortedCounts.slice(0, 6).map(item => item.number);
    const hotNumbers = sortedCounts.slice(-6).map(item => item.number);
    setHotNumbers(hotNumbers);
    setColdNumbers(coldNumbers);
  };

  // 빈도수가 작은 순서대로 정렬하는 함수
  const sortByWeightAscending = (a, b) => a.weight - b.weight;

  // 출현률 계산 함수
  const calculateProbabilities = (counts) => {
    const totalWeight = counts.reduce((acc, { weight }) => acc + weight, 0);
    return counts.map(({ number, weight }) => ({ number, probability: weight / totalWeight }));
  };

  // 출현률을 기반으로 숫자 추출 함수
  const generatePredictedNumbers = (counts) => {
    const probabilities = calculateProbabilities(counts);
    const selectedNumbers = new Set(); // 중복을 방지하기 위해 Set 사용
    while (selectedNumbers.size < 6) {
      let randomNumber = Math.random();
      let cumulativeProbability = 0;
      for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i].probability;
        if (randomNumber <= cumulativeProbability) {
          selectedNumbers.add(probabilities[i].number);
          break;
        }
      }
      // 확률 조정
      const remainingProbabilities = probabilities.filter(({ number }) => !selectedNumbers.has(number));
      const remainingTotalWeight = remainingProbabilities.reduce((acc, { probability }) => acc + probability, 0);
      probabilities.forEach(prob => {
        if (!selectedNumbers.has(prob.number)) {
          prob.probability /= remainingTotalWeight;
        }
      });
    }
    return Array.from(selectedNumbers).sort((a, b) => a - b);
  };

  return (
    <div className="quota-container">
      <h3>콜드 넘버</h3>
      <div className="cold-numbers-list">
        {coldNumbers.map(number => (
          <span key={number}>{number} </span>
        ))}
      </div>

      <h3>핫 넘버</h3>
      <div className="hot-numbers-list">
        {hotNumbers.map(number => (
          <span key={number}>{number} </span>
        ))}
      </div>

      <h2>최근 50게임의 빈도수를 기반으로 한 예측</h2>
      <div>
        <h3>예측 번호</h3>
        <div className="predicted-numbers-list">
          {predictedNumbers.map(number => (
            <span key={number}>{number} </span>
          ))}
        </div>
      </div>

      {!lottoData && <p>Loading...</p>}
    </div>
  );
};

export default Quota;
