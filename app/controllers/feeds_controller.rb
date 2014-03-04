class FeedsController < ApplicationController
  before_action :authenticate_user!


  def index
    @user = current_user
    @feed = Feed.new
    @category = Category.new
    @feeds = @user.feeds
    @posts = @user.all_posts
  end

  def new
  end

  def create
    @user = current_user
    @feed = Feed.find_or_create_by(url: params[:feed][:url])

    if @feed.save
      @user.feeds.push(@feed) unless @user.feeds.include? @feed
      @feed.update_feed
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
    params.require(:feed).permit(:url)
  end
end
