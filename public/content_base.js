
const blockPurchaseButtons = () => {
    const buttons = document.querySelectorAll('#buy-now-button, input[name="submit.add-to-cart"]');
    const productTitle = document.getElementById('productTitle');
    const priceElement = document.getElementsByClassName('a-price-whole');

    const title = productTitle ? productTitle.textContent.trim() : '（商品名不明）';
    const price = (priceElement[0] != null) ? priceElement[0].textContent.trim() : '（価格不明）';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`ちょっと待って！？\n\n「${title}」を ${price} 円で買おうとしています！\n\n本当に必要!？`);
        });
    });
};
  
setTimeout(blockPurchaseButtons, 1500); // 遅延してDOMが揃うのを待つ