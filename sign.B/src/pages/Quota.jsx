import React, { useState, useEffect } from 'react';
import './Quota.css';

const Quota = () => {
  const [lottoData, setLottoData] = useState(null);
  const [predictedNumbers, setPredictedNumbers] = useState([]);
  const [hotNumbers, setHotNumbers] = useState([]);
  const [coldNumbers, setColdNumbers] = useState([]);
  const [latestDraw, setLatestDraw] = useState(null); // 최신 회차의 데이터 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000');
        const data = await response.json();
        const last50Results = data.slice(Math.max(data.length - 50, 0)); // 마지막 50개의 결과 가져오기
        setLottoData(last50Results);

        // 최신 회차의 데이터 추출
        const latestDrawData = data[data.length - 1]; // 데이터 배열의 마지막 요소가 최신 회차의 데이터입니다.
        setLatestDraw(latestDrawData); // 최신 회차 데이터 상태 업데이트

        // 각 숫자의 빈도수를 계산하는 함수
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

        const counts = calculateNumbersWithWeights(last50Results);
        setHotAndColdNumbers(counts);
        setPredictedNumbers(generatePredictedNumbers(counts));
      } catch (error) {
        console.error('Error fetching lotto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="quota-container">
      <div className="expect-container">
        {/* latestDraw가 null이 아닐 때만 회차 번호와 예측 번호를 표시 */}
        {latestDraw ? (
          <>
            <span style={{ fontWeight: 'bold', color: '#FF7240' }}>{latestDraw.drwNo}회 </span><span>예측번호</span>
            <div className="predicted-numbers-list">
              {predictedNumbers.map(number => {
                let range;
                if (number >= 1 && number <= 10) {
                  range = "1-10";
                } else if (number >= 11 && number <= 20) {
                  range = "11-20";
                } else if (number >= 21 && number <= 30) {
                  range = "21-30";
                } else if (number >= 31 && number <= 40) {
                  range = "31-40";
                } else if (number >= 41 && number <= 45) {
                  range = "41-45";
                }

                return (
                  <span key={number} data-range={range}>
                    {number}
                  </span>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading latest draw data...</p>
        )}
      </div>

      <div className="number-container">
        <div className="cold-hot-container">
          <div className="cold-numbers">
            <h3>콜드 넘버</h3>
            <div className="cold-numbers-list">
              {coldNumbers.map(number => (
                <span key={number}> {number}</span>
              ))}
            </div>
          </div>

          <div className="hot-numbers">
            <h3>핫 넘버</h3>
            <div className="hot-numbers-list">
              {hotNumbers.map(number => (
                <span key={number}> {number}</span>
              ))}
            </div>
          </div>
        </div>

        {!lottoData && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Quota;
