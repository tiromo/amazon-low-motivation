window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.option-form');

    // データ保存
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelectorAll('input')[0].value.trim();
        const price = form.querySelectorAll('input')[1].value.trim();
        const hobbyimage = form.querySelectorAll('input')[2].value.trim();
        // const usecheck = form.querySelectorAll('input')[3].value.trim();

        if (!title || !price) {
            alert('両方の項目を入力してください');
            return;
        }

        // 保存したデータを取得
        chrome.storage.sync.get({ items: []}, (result) => {
            const newItem = { title, price: Number(price), hobbyimage, usecheck};
            const updatedItems = [...result.items, newItem];
            chrome.storage.sync.set({ items: updatedItems}, () => {
                alert('登録しました');
                renderHobbyList(); //リストを更新
                form.reset();
            });
        });

    });

    // データを表示
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
                const hobby_list = document.createElement("menu");
                hobby_list.id = "hobby-list";
                result.items.forEach((item, index)=> {
                    const HobbyItem = document.createElement("ui"); //一要素
                    const ItemText = document.createElement("a"); //テキスト
                    const ItemDelete = document.createElement("button"); //削除ボタン
                    HobbyItem.value = index; //リスト内id
                    ItemText.textContent = `題名:${item.title} / 値段:${item.price}`;
                    ItemDelete.textContent = `削除`;
                    ItemDelete.id = "delete-item";
                    ItemDelete.addEventListener('click', () => {
                        deleteFunction(HobbyItem.value);
                    });
                    HobbyItem.append(ItemText);
                    HobbyItem.append(ItemDelete);
                    hobby_list.append(HobbyItem); //リストに追加
                });
                hob_container.appendChild(hobby_list);

                console.log(result.items)
            }
        });
    };

    //削除ボタンの挙動
    function deleteFunction(index) {
        console.log("delete")
        chrome.storage.sync.get({items: []}, (result) => {
            result.items.splice(index, 1);
            chrome.storage.sync.set({ items: result.items}, () => {
                renderHobbyList(); //リストを更新
            });
        });
    };

    renderHobbyList(); //リストを表示

});

