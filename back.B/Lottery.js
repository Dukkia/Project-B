const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 9000;
const URL = 'https://dhlottery.co.kr/gameResult.do?method=byWin';
const API_URL = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=';

// 캐시 객체 생성
const cache = {};

// CORS 설정
app.use(cors());

app.get('/', async (req, res) => {
    try {
        // 캐시에 저장된 데이터가 있는지 확인
        if (cache['lottoData']) {
            console.log('Data retrieved from cache');
            res.json(cache['lottoData']);
        } else {
            const { data } = await axios.get(URL);
            const $ = cheerio.load(data);
            const h4Text = $('h4').text();
            const numbers = h4Text.match(/\d+/g).join(', '); // 숫자만 추출하여 콤마로 연결
            const results = [];

            for (let i = 1; i <= numbers; i++) { // 추출한 숫자 개수만큼 반복
                try {
                    const response = await axios.get(`${API_URL}${i}`);
                    const { drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo, drwNo } = response.data;
                    const drawData = { drwNo, drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo };
                    results.push(drawData);
                } catch (error) {
                    console.error(`Error fetching data for draw number ${i}:`, error.message);
                }
            }

            // 캐시에 데이터 저장
            cache['lottoData'] = results;

            res.json(results);
        }
    } catch (error) {
        console.error('Error fetching the page:', error);
        res.status(500).send('Error fetching the page');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
