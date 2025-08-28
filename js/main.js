async function poketmonCall() {
    const res = await fetch('/api/hello');
    const data = await res.json();
    //console.log(data) 4. 최종 배열.png

    const allContainer = document.getElementById('poketmon-slot-container');

    allContainer.innerHTML = data.map(ele =>
        `
            <div class="img-box">
                <img src="${ele.image}" alt="">
                <div class="monster-index">NO.${ele.id}</div>
            </div>
            <div class="text-box">
                <div class="monster-name">${ele.name}</div>
            </div>
        `
    ).join('')

}

poketmonCall();