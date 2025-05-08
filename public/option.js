document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.option-form');

    // データ保存
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelectorAll('input')[0].value.trim();
        const price = form.querySelectorAll('input')[1].value.trim();
        const hobbyimage = form.querySelectorAll('input')[2].value.trim();

        if (!title || !price) {
            alert('両方の項目を入力してください');
            return;
        }

        // 保存したデータを取得
        chrome.storage.sync.get({ items: []}, (result) => {
            const newItem = { title, price: Number(price), hobbyimage};
            const updatedItems = [...result.items, newItem];
            chrome.storage.sync.set({ items: updatedItems}, () => {
                alert('登録しました');
                // renderHobbyList();
                form.reset();
            });
        });

    });

    function renderHobbyList() {
        const hob_container = document.getElementById('hobby-container');
        hob_container.innerHTML = ''; //クリア
        chrome.storage.sync.get({items: []}, (result) => {
            if(result.items.length===0) {
                const msg = document.createElement("p");
                msg.textContent = "登録された趣味がありません";
                hob_container.appendChild(msg);
            }
            else {
                const hobby_list = document.createElement("ul");
                result.items.forEach(item => {
                    const Hobby = document.createElement("li");
                    Hobby.textContent = `題名:${item.title} / 題名:${item.price}`;
                    hobby_list.append(Hobby);
                });
                hob_container.appendChild(hobby_list);
            }
        });
    }
    
    renderHobbyList();

});