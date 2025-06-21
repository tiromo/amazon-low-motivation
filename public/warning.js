// public/warning.js

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title') || '（商品名不明）';
    const price = params.get('price') || '（価格不明）';
    const image = params.get('image') || '';
    const originUrl = params.get('origin');

    document.getElementById('product').textContent = `「${title}」を買おうとしています。`;
    document.getElementById('price').textContent = `価格は ${price} です。`;
    const img = document.getElementById('product-image');

    if (image && img) {
        img.src = image;
        img.alt = title;
        img.style.maxWidth = '450px'; // サイズ調整
        img.style.maxHeight = '100%'; // サイズ調整
        img.style.display = 'block';
        img.style.marginTop = '20px';
        // document.body.appendChild(img);
    };
    
    console.log("url", originUrl)

    // ボタンの挙動
    const waitTime = 5; //待機時間
    let remaining = waitTime;

    const addToCartBtn = document.getElementById('add-to-cart-btn')
    const gargeBar = document.getElementById('garge-bar')
    const backBtn = document.getElementById('back-btn')
    gargeBar.style.width = '0%';

    addToCartBtn.disabled = true;
    const countdown = setInterval(() => {
        const percent = ((waitTime - remaining + 1) / waitTime) * 100;
        gargeBar.style.width = `${percent}%`;
        console.log(gargeBar.style.width);
        console.log(remaining);
        if (remaining <= 0) {
            console.log("time complete")
            clearInterval(countdown);
            addToCartBtn.disabled = false;
            gargeBar.style.width = '100%';
        }
        remaining--;E
    }, 1000)

    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    addToCartBtn.addEventListener('click', () => {
        if(originUrl) {
            const hasQuery = originUrl.includes('?');
            const separator = hasQuery ? '&' : '?';
            window.location.href = `${originUrl}${separator}auto_add=true`;
            // window.location.href = `${originUrl}?auto_add=true`
        } else {
            window.history.back();
        }
    });

    chrome.storage.sync.get({ items: [], Flgindex: []}, (result) => {
        console.log("items", result.items);
        console.log("Flg", result.Flgindex.Flg);
        let Flg = result.Flgindex.Flg;
        console.log("hobby", result.items[Flg]);
        const hobby = {'hobbytitle': result.items[Flg].title, 'hobbyprice': result.items[Flg].price};
        console.log("hobby", hobby);
        price_num = Number(price.replace(/,/g, "")); 
        hobby_count = (price_num / hobby.hobbyprice).toFixed(2);
        if(hobby) {
            const warning = document.getElementById('hobby');
            warning.textContent = `この商品の値段で「${hobby.hobbytitle}」が「${hobby_count}回」経験できますよ`;
            // warning.style.color = 'red';
            // warning.style.fontWeight = 'bold';
            // document.querySelector('.container').appendChild(warning);
        }
    });

});