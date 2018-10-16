json.array! @new_messages  do |new_message|
  json.id         new_message.id
  json.user_name  new_message.user.name
  json.content    new_message.content
  json.image      new_message.image.url
  json.created_at new_message.created_at.strftime('%Y/%m/%d %H:%M')
end
