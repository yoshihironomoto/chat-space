$(function() {
  function buildHTML(message){
  	var MessageImage = '';
  	if(message.image){
  	  MessageImage ='<img src= ${message.image}, class="lower-message__image" >'}

    var html = `<div class="message">
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
      $('#form_empty').val('')
    })
    .fail(function(){
      alert('error')
    })
  })
});