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

    document.getElementById('back-btn').addEventListener('click', () => {
        window.history.back();
    });

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        if(originUrl) {
            const hasQuery = originUrl.includes('?');
            const separator = hasQuery ? '&' : '?';
            window.location.href = `${originUrl}${separator}auto_add=true`;
            // window.location.href = `${originUrl}?auto_add=true`
        } else {
            window.history.back();
        }
    });
  });