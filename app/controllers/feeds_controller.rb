class FeedsController < ApplicationController
  before_action :authenticate_user!

  def actions
  end

  def index
    @user = current_user
    @feed = Feed.new
  end

  def new
  end

  def create
    @user = current_user
    @feed = Feed.new(feed_params)
    @user.feeds.push(@feed)
    binding.pry

    if @feed.save
      flash['notice'] = 'Feed added!'
      redirect_to user_feeds_path
    else
      flash.now['alert'] = @feed.errors.full_messages.join(', ')
      render :index
    end

  end

  def show
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end
end
