class MessagesController < ApplicationController

  def index
    # @messages = Message.includes(:user).order("created_at DESC")
  end

end
