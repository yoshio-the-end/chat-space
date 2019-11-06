$(document).on('turbolinks:load',function(){
  function buildHTML(message){
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