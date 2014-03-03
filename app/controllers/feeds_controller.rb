class FeedsController < ApplicationController
  before_action :authenticate_user!


  def index
    @user = current_user
    @feeds = @user.feeds
  end

  def new
  end

  def create
    @user = current_user
    @feed = current_user.feeds.new(feed_params)

    if @feed.save
      flash['notice'] = 'Feed added!'
      redirect_to feeds_path
    else
      flash.now['alert'] = @feed.errors.full_messages.join(', ')
      render :index
    end

  end

  def show
  end

  private

  def feed_params
    params.require(:feed).permit(:name, :url)
  end
end
