class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)

    respond_to do |format|
      format.json{
        if params[:latestMessage][:id].to_i != @group.messages.last.id
          @new_messages = @group.messages.where("id > #{params[:latestMessage][:id].to_i}")
        end
      }
      format.html
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{redirect_to action: :index}
        format.json
      end
      # redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください。"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
