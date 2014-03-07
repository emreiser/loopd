class HomeController < ApplicationController
	layout "home"

	def index
		# if user_signed_in?
		# 	redirect_to feeds_path
		# end
    @category = Category.new
    feed = Feed.where(url: 'http://rss.cnn.com/rss/cnn_topstories.rss')
    @posts = feed[0].posts.limit(10)


    respond_to do |format|
      format.json { render json: { posts: @posts} }
      format.html
    end
	end
end
