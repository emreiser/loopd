class FeedsController < ApplicationController
  before_action :authenticate_user!


  def index
    @user = current_user
    @feed = Feed.new
    @category = Category.new

    @feeds = @user.feeds.sort!{ |x,y| x.name <=> y.name }
    @posts = @user.all_posts
    @categories = @user.categories

    respond_to do |format|
      format.json { render json: { feeds: @feeds.to_json(include: :categories), posts: @posts, categories: @categories }}
      format.html
    end
  end

  def new
  end

  def create
    @user = current_user
    @feed = Feed.new
    @category = Category.new
    @feeds = @user.feeds
    @posts = @user.all_posts
    @categories = @user.categories

    if params[:feed][:url].present?
      @feed = Feed.find_or_create_by(url: params[:feed][:url])
      response = @feed.get_rss_response

      if Feed.validate_feed(response)
        @user.feeds.push(@feed)
        @feed.add_feed(response)
        @feed.update_feed(response)
        flash['notice'] = 'Feed added!'
        redirect_to feeds_path
      else
        flash.now['alert'] = "Invalid RSS Response"
        render :index
      end

    else
      flash.now['alert'] = "URL can't be blank"
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
