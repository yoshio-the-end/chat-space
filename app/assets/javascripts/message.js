$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    let content = message.content? `${message.content}` : "";
    let image = message.image? `<img class='messgae_image' src=${message.image}>` : "";
    var html = `<div class="message">
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
              console.log(html)
    return html;
  }
  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }
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
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      scroll()
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
  });
});