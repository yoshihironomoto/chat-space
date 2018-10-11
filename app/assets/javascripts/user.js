$(function() {
  function buildHTML(user) {
  	var html = `<div class="chat-group-user clearfix">
		      <p class="chat-group-user__name">${user.name}</p>
		      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name= "${user.name}">追加</a>
		    </div>`
    $('#user-search-result').append(html);
  }

  function buildNoHTML(user) {
  	var html = `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user}</p>
                    </div>`
    $('#user-search-result').append(html);
  }

  function buildMemberHTML(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value= '${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
      	users.forEach(function(user) {
      	  buildHTML(user);
      	});
      }
      else {
      	$('#user-search-result').empty();
      	buildNoHTML("No user");
      }
    })

    .fail(function(){
      alert("失敗")
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function () {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    buildMemberHTML(id, name); 
    $(this).parent().remove();
  })

  $(document).on("click", ".js-remove-btn", function () {
  	$(this).parent().remove();
  })

});
