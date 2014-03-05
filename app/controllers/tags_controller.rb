class TagsController < ApplicationController

	def tag_feed
		user = current_user
		@category = user.categories.find_or_create_by(name: params[:tag][:name])
		@feed = Feed.find(params[:tag][:feed])
		@categories = user.categories
		@feeds = user.feeds

		if @category.feeds.include? Feed.find(@feed.id)
			render json: { message: 'Already tagged' }
    else
    	@category.feeds.push(@feed)
      render json: { message: 'Feed tagged', feeds: @feeds.to_json(:include => :categories), categories: @categories }
    end
	end

end