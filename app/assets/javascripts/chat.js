$(function() {

  // 画面上最新のメッセージ
  var latestMessage = window.latestMessage;
  var alertMessage = $(".alert p");

  // html要素追加処理
  function appendList(data) {
    var html = `<div class="message">
                  <div class="message__user-name">
                    ${data.user_name}
                  </div>
                  <div class="message__date">
                    ${data.created_at}
                  </div>
                  <div class="message__text">
                    ${data.content}
                  </div>
                  ${(data.image != null) ? `<img style="margin-top: 10px" src="${data.image}"}` : ''}
                </div>`;
    $(".messages").append(html);

    var scrollTarget = $(".main").find($(".messages"));
    scrollTarget.animate({scrollTop: scrollTarget[0].scrollHeight}, 500, "swing");
  }

  // メッセージ非同期通信投稿
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var input = $(".message").val();
    var url = $(this).attr("action");
    var formData = new FormData(this);
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      appendList(data);
      $('.message').val('');
      // 画面上の最新メッセージ更新
      latestMessage = data;
      // submitのdisbaled属性解除
      $('.submit').attr('disabled', false);
    })

    .fail(function() {
      alert('メッセージの送信に失敗しました！');
    });
  });

  // メッセージ自動更新処理
  function reloadPage() {
    // chat画面でのみ処理実行
    if(document.URL.match("messages")) {
      var url = window.location.pathname;
      $.ajax({
        type: "GET",
        url: url,
        data: {
          latestMessage: latestMessage
        },
        dataType: "json"
      })

      .done(function(messages) {
        messages.forEach(function(message) {
          appendList(message);
          // 画面上の最新メッセージ更新
          latestMessage = message;
        });
      })

      .fail(function() {
        alertMessage.text("接続に失敗しました！");
      });
    }
  }

  // 5秒ごとにメッセージ自動更新呼び出し
  setInterval(reloadPage, 5000);
});
