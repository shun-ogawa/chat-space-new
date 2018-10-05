$(function(){
  var searchResult = $("#user-search-result");
  var chosenUsersList = $("#chat-group-users");
  var textBox = $("#user-search-field");
  var previousChosenUser = [];

  function buildHtml(user){
    var html =
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${user.name}</p>
       <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
     </div>`;
    searchResult.append(html);
  }

  function appendGroupUser(user){
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
      <p class='chat-group-user__name'>${user.userName}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`;
    chosenUsersList.append(html);
  }

  function makeUserChosenArray(){
    var chosen = [];
    chosenUsersList.find("input[type=hidden]").each(function(index, element){
        chosen.push(parseInt($(element).attr("value")));
    });
    return chosen;
  }

  function searchUser(){
    var input = textBox.val();
    var url = "/users";

    // inputが空白でない時のみ通信
    if(input.match(/[a-z]/)){
      $.ajax({
        type: "GET",
        url: url,
        data: {
          keyword: input
        },
        dataType: "json"
      })
      .done(function(users){
        var chosen = makeUserChosenArray();

        if(users !== previousChosenUser){
          searchResult.empty();
          users.forEach(function(user){
            // ユーザーがリストに追加されてない場合のみbuildHtml
            if(chosen.indexOf(user.id) == -1){
              buildHtml(user);
            }
          });
        }

        previousChosenUser = users
      })
      .fail(function(users){
        $(".alert p").text("エラーが発生しました。")
      });
    }
    else{
      searchResult.empty();
    }
  }

  textBox.on("keyup",function(){
    searchUser();
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var user = $(this).data();
    console.log($(this));
    console.log(user);
    appendGroupUser(user);
    $(this).parent().remove();
  })

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
    searchUser();
  })
})
