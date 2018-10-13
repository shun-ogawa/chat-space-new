$(function() {

  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message__date">
                    ${message.created_at}
                  </div>
                  <div class="message__text">
                    ${message.content}
                  </div>
                  ${(message.image != null) ? `<img style="margin-top: 10px" src="${message.image}"}` : ''}
                </div>`;
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var input = $(".message").val();
    var url = $(this).attr("action");
    console.log(url);
    var formData = new FormData(this);
    $.ajax(function() {
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.message').val('');
      $(".main").find($('.messages')).animate({scrollTop: $(".main").find($('.messages'))[0].scrollHeight}, 500, "swing");
    })

    .fail(function() {
      console.log(data);
      alert('メッセージの送信に失敗しました！');
    });
  });
});
