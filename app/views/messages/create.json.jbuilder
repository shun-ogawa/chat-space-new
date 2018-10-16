json.id          @message.id
json.content     @message.content
json.image       @message.image.url
json.user_id     @message.user_id
json.group_id    @group.id
json.created_at  @message.created_at.strftime('%Y/%m/%d %H:%M')
json.user_name   @message.user.name



