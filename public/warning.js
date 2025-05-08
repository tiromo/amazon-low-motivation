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
        img.style.maxWidth = '100px'; // サイズ調整
        img.style.display = 'block';
        img.style.marginTop = '20px';
        // document.body.appendChild(img);
    };
    
    console.log("url", originUrl)

    // ボタンの挙動
    const waitTime = 5; //待機時間
    let remaining = waitTime;

    const addToCartBtn = document.getElementById('add-to-cart-btn')
    const backBtn = document.getElementById('back-btn')

    addToCartBtn.disabled = true;
    const countdown = setInterval(() => {
        remaining--;
        addToCartBtn.innerText = `カートに追加\n(${remaining}秒後にクリックできます)`;

        if (remaining < 0) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = `カートに追加`;
        }
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

    chrome.storage.sync.get({ items: []}, ({items}) => {
        console.log("items", items);
        const hobby = {'hobbytitle': items[0].title, 'hobbyprice': items[0].price};
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