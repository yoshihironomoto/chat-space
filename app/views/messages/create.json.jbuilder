json.id  @message.id
json.content  @message.content
json.image  @message.image.url
json.group_id @message.group_id
json.user_name @message.user.name
json.created_at format_posted_time(@message.created_at)
json.user_id @message.user_id