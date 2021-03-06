class FeedsController < ApplicationController
  before_action :authenticate_user!


  def index
    @user = current_user
    @feed = Feed.new
    @category = Category.new

    @user.update_all_feeds

    @feeds = @user.feeds
    @posts = @user.all_posts
    @categories = @user.categories

    respond_to do |format|
      format.json { render json: { feeds: @feeds.to_json(:include => :categories), posts: @posts, categories: @categories.to_json(:include => :feeds) }}
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
    @categories = @user.categories

    if params[:feed][:url].present?
      @feed = Feed.find_or_create_by(url: params[:feed][:url])
      response = @feed.get_rss_response

      if Feed.validate_feed(response)
        if @user.feeds.include? Feed.find(@feed.id)
          render json: {message: 'Feed already exists'}
        else
          @user.feeds.push(@feed)
          @feed.add_feed(response)
          @feed.update_feed(response)
          @posts = @user.all_posts
          respond_to do |format|
            format.json { render json: { feed: @feed, posts: @feed.posts, message: 'Feed added!' }}
            format.html
          end
        end

      else
        render json: { message: 'Invalid RSS feed. Please try again.' }
      end

    else
      render json: { message: "URL can't be blank" }
    end

  end

  # Deletes a feed, the feed's posts, and returns user's feeds, posts, categories
  def destroy
    user = current_user
    @feed = Feed.find(params[:id])
    user.feeds.delete(@feed)

    user.categories.each do |category|
      category.feeds.delete(@feed)
    end

    @feeds = user.feeds
    @posts = user.all_posts
    @categories = user.categories

    render json: { message: 'Feed deleted', feeds: @feeds.to_json(:include => :categories), posts: @posts, categories: @categories.to_json(:include => :feeds) }

  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end
end
