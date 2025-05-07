document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.option-form');

    // データ保存
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelectorAll('input')[0].value.trim();
        const price = form.querySelectorAll('input')[1].value.trim();

        if (!title || !price) {
            alert('両方の項目を入力してください');
            return;
        }

        // 保存したデータを取得
        chrome.storage.sync.get({ items: []}, (result) => {
            const newItem = { title, price: Number(price)};
            const updatedItems = [...result.items, newItem];
            chrome.storage.sync.set({ items: updatedItems}, () => {
                alert('登録しました');
                form.reset();
            });
        });
    });
});