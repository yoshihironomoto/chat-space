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
     return html;
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

  

  setInterval(function() {
    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      type: 'GET',
      url: location.href,
      dataType: 'json'
    })
    .done(function(messages) {
      var id = $('.message').data('messageId');
      var insertHTML = '';
      messages.forEach(function(message) {
        if (message.id > id) {
          insertHTML += buildHTML(massage);
        }
      });
      $('.messages').append(insertHTML);
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
    }} , 5 * 5000 );
  });
});