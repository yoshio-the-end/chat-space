$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var image = message.image? `<img class='messgae_image' src=${message.image}>` : "";
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">${message.content}</p>
                  </div>
                  ${image}
              </div>`
    return html;
  }
  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }

  // ここから自動更新機能
  var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){    // group/:group_id/messagesというURLの時だけ、以降の記述が実行.
        var href = 'api/messages#index {:format=>"json"}'              // リクエスト先 {形式を指定}
        var last_message_id = $('.message:last').data('message-id');   // カスタムデータ属性を利用して、最新のメッセージIDをとる。
      $.ajax({
        url:  href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages){
        var insertHTML='';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            scroll()
          });
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      });
    };
  };

  setInterval(reloadMessages, 5000);

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      scroll()
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('error');

    })
  });
});