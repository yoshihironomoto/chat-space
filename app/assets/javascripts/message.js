$(function() {
  function buildHTML(message){
    var MessageImage = '';
    if(message.image){
      MessageImage =`<img src= "${message.image}", class="lower-message__image" >`
    }
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class"upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    ${MessageImage}
                  </div>
                </div>`
     $(".messages").append(html);
  }

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var url = window.location.href
    var formData = new FormData(this)
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('#form_disabled').prop('disabled', false);
    })
    .fail(function(){
      alert('error')
    });
  });

  function updatePage() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message:last').data('messageId'); //(1)
      $.ajax({
        type: 'GET',
        url: location.href,
        data: {
          message: {id: message_id}
        },
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message){
         buildHTML(message);
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  }
    setInterval(updatePage, 5000);
});