$(function() {
  var latestMessage = window.latestMessage;
  var alertMessage = $(".alert p");

  function appendList(data) {
    var image = (data.image != null) ? `<img style="margin-top: 10px" src="${data.image}"}` : ''
    var html = `<div class="message">
                  <div class="message__user-name"
                    ${data.user_name}
                  </div>
                  <div class="message__date" >
                    ${data.created_at}
                  <div>
                  <div class="message__text" >
                      ${data.content}
                      ${image}
                  </div>
                </div>`
    $(".messages").append(html);

    var scrollTarget = $(".main").find($(".messages"));
    console.log(scrollTarget);
    scrollTarget.animate({scrollTop: scrollTarget[0].scrollHeight}, 500, "swing");
  }

  function reloadPage() {
    var url = window.location.pathname;
    console.log(url);
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
        latestMessage = message;
      });
    })

    .fail(function() {
      alertMessage.text("接続に失敗しました！");
    });
  }

  setInterval(reloadPage, 5000);
});
