const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../')));

app.get('/api/hello', async (req, res) => {
  //res.json({ message: 'Hello from Express!' });

  try {
    const PoketmonRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const PoketmonData = await PoketmonRes.json();

    const pokets = await Promise.all(PoketmonData.results.map(async (p) => {
      const detailRes = await fetch(p.url);
      const detailData = await detailRes.json();
      // detailData 리턴 시 배열 호출
      //return detailData

      // // species에서 한글 이름 가져오기
      const speciesRes = await fetch(detailData.species.url);
      const speciesData = await speciesRes.json();

      //return speciesData; // console - 3.한글이름 가져오기.png
      const koreaNameObj = speciesData.names.find(n => n.language.name === 'ko');
      const koreanName = koreaNameObj ? koreaNameObj.name : detailData.name;

      const speciestype = detailData.types.map(el => el.type.name)
      const test = speciesData.location_area_encounters;

      // 공식 아트워크 이미지 URL
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailData.id}.png`;

      return { id: detailData.id, name: koreanName, image, speciestype, test };
    }))

    res.json(pokets)
    //res.json(PoketmonData)
  } catch (err) {
    console.error(err)
  }

});
// 어떤 경로로 요청하든 index.html을 전송
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});