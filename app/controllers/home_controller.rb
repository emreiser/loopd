class HomeController < ApplicationController
	layout "home"

	def index
		if user_signed_in?
			redirect_to feeds_path
		end
    @category = Category.new
    feed = Feed.where(url: 'http://rss.cnn.com/rss/cnn_topstories.rss')
    @posts = feed[0].posts.limit(10)

    @home_feed = Feedzirra::Feed.fetch_and_parse('http://rss.cnn.com/rss/cnn_topstories.rss')
    @entries = @home_feed.entries

    respond_to do |format|
      format.json { render json: { posts: @posts} }
      format.html
    end
	end
end
