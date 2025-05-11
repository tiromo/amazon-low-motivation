window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.option-form');

    // データ保存
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const title = form.querySelector('input[name=hobby-title]').value.trim();
        const price = form.querySelector('input[name=hobby-price]').value.trim();
        const hobbyimage = form.querySelector('input[name=hobby-image]').value.trim();
        const usecheck = form.querySelector('input:checked[name=use-check]').value.trim();
        
        if (!title || !price) {
            alert('両方の項目を入力してください');
            return;
        }

        if (usecheck == 'use') {
            var checkFlg = true;
        } else {
            var checkFlg = false;
        }


        // 保存したデータを取得
        chrome.storage.sync.get({ items: [], Flgindex: []}, (result) => {
            const newItem = { title, price: Number(price), hobbyimage, useFlg: checkFlg};
            const updatedItems = [...result.items, newItem];
            let newFlg = {Fig: updatedItems.length - 1};
            console.log(updatedItems);
            console.log(newItem.useFlg);

            if (updatedItems.length == 1) {
                newFlg = {Flg: 0};
                console.log("first hobby");
            } else if (checkFlg) {
                updatedItems[result.Flgindex.Flg].useFlg = false;
            } else {
                newFlg = result.Flgindex;
            }
            console.log(updatedItems)
            console.log(updatedItems[newFlg.Flg])
            console.log(newFlg);
            chrome.storage.sync.set({ items: updatedItems, Flgindex: newFlg}, () => {
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
        chrome.storage.sync.get({items: [], useFlg: []}, (result) => {
            if(result.items.length===0) {
                const msg = document.createElement("p");
                msg.textContent = "登録された趣味がありません";
                hob_container.appendChild(msg);
            }
            else {
                const hobby_list = document.createElement("menu");
                hobby_list.id = "hobby-list";
                result.items.forEach((item, index)=> {
                    const HobbyItem = document.createElement("ul"); //一要素
                    const ItemText = document.createElement("a"); //テキスト
                    const ItemDelete = document.createElement("button"); //削除ボタン
                    const UseItem = document.createElement("button"); //使用ボタン
                    HobbyItem.value = index; //リスト内id
                    ItemText.textContent = `題名:${item.title} / 値段:${item.price}`;
                    ItemDelete.textContent = `削除`;
                    ItemDelete.id = "delete-item";
                    ItemDelete.addEventListener('click', () => {
                        deleteFunction(HobbyItem.value);
                    });
                    UseItem .textContent = `使用`
                    UseItem.id = "use-btn";
                    UseItem.addEventListener('click', () => {
                        if (UseItem!=true) {
                            useBtnFunction(HobbyItem.value);
                        }
                    });
                    if (item.useFlg) {
                        UseItem.textContent = `使用中`;
                        UseItem.style.backgroundColor = "gray";
                    }
                    HobbyItem.append(ItemText);
                    HobbyItem.append(ItemDelete);
                    HobbyItem.append(UseItem);

                    hobby_list.append(HobbyItem); //リストに追加
                });
                hob_container.appendChild(hobby_list);

            }
            console.log(result);
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

    // 使用ボタンの挙動
    function useBtnFunction(index) {
        console.log("change hobby");
        chrome.storage.sync.get({items: [], Flgindex:[]}, (result) => {
            const newFlg = {Fig: index};
            result.items[index].useFlg = true;
            result.items[result.Flgindex.Fig].useFlg = false;
            chrome.storage.sync.set({ items: result.items, Flgindex: newFlg}, () => {
                renderHobbyList(); //リストを更新
            });
        });
    };

    // 使用データ周りの挙動
    function usehobby() {

    };

    renderHobbyList(); //リストを表示

});

