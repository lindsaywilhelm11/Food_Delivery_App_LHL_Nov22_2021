# admin orders todo

- [x] オーダー表示
  - 表示項目
    - [x] 注文番号
    - [x] 名前
    - [x] date, time(hh:mm)
    - [x] 合計金額($はejs側で付与)
    - [x] 注文内容
      - [x] アイテム名
      - [x] 個数
  - [x] date, timeの降順ソート(order by)
  - [x] ステータス変更のためのボタン
    - [x] とりあえずボタン表示だけする
    - [x] ヘッダーの取得をするsqlにstatusを追加
    - [x] ボタンのテキストをdbのstatusと同じにする
  - [x] ステータスがcompleteじゃないものだけ表示 (where)

- [x] 新規アイテム追加画面へのリンク追加

- [ ] ステータス変更(new, prep, ready, complete)
  - [ ] 最初はnew状態で表示される
  - [ ] statusを更新するupdate sqlを考える
  - [ ] statusを更新できるurlを作る
  - [ ] 最初のボタンクリックでprepに変わる
  - [ ] 次のボタンクリックでready
  - [ ] もう一回押したらcompleteになる
