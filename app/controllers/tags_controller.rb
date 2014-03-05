class TagsController < ApplicationController

	def tag_feed
		user = current_user
		@category = user.categories.find_or_create_by(name: params[:tag][:name])
		@feed = Feed.find(params[:tag][:feed])

		@category.feeds.push(@feed)
		redirect_to feeds_path
	end

end