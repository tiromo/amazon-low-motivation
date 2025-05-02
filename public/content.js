// public/content,js
console.log("Amazon Purchase Blocker is running");

const blockPurchaseButtons = () => {
  const productTitle = document.getElementById('productTitle');
  const priceElement = document.querySelector('.a-price-whole');
  const productimage = document.getElementById('landingImage');
  const title = productTitle ? productTitle.textContent.trim() : '（商品名不明）';
  const price = priceElement ? priceElement.textContent.trim() : '（価格不明）';
  const image = productimage ? productimage.src : '';

  console.log("画像URL:", image);

  const redirectToWarning = (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('auto_add') === 'true') {
        return;
    }
    e.preventDefault();
    const query = new URLSearchParams({ title, price, image, origin: window.location.href}).toString();
    const url = chrome.runtime.getURL(`warning.html?${query}`);
    window.location.href = url;
  };

  const attachListeners = () => {
    const buttons = document.querySelectorAll('#buy-now-button, input#add-to-cart-button, input[name="submit.add-to-cart"]');
    buttons.forEach(button => {
      if (!button.dataset.blocked) {
        button.dataset.blocked = 'true';
        button.addEventListener('click', redirectToWarning);
      }
    });
  };

  const observer = new MutationObserver(attachListeners);
  observer.observe(document.body, { childList: true, subtree: true });

  attachListeners();
};

blockPurchaseButtons();

const autoAddToCart = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("autoAdd");
    if (urlParams.get('auto_add') === 'true') {
        console.log("URL:", urlParams.get('auto_add'));
        const cartButton = document.querySelector('input#add-to-cart-button, input[name="submit.add-to-cart"], input[name="submit.subscribe"]');
        if(cartButton) {
            console.log("カートに追加中")
            cartButton.click();
        } else {
            console.log("ボタンが見つかりません")
        }
    }
};

setTimeout(autoAddToCart, 1000)
