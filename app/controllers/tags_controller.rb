class TagsController < ApplicationController

	def tag_feed
		user = current_user
		@category = user.categories.find_or_create_by(name: params[:tag][:name])
		@feed = Feed.find(params[:tag][:feed])
		@categories = user.categories
		@feeds = user.feeds

		if @category.name.present?
			if @category.feeds.include? Feed.find(@feed.id)
				render json: { message: 'Already tagged' }
	    else
	    	@category.feeds.push(@feed)
	      render json: { message: 'Feed tagged', feeds: @feeds.to_json(:include => :categories), posts: @posts, categories: @categories.to_json(:include => :feeds) }
	    end
	  else
	  	render json: { message: "Tag can't be blank" }
	  end

	end

	def destroy_tag
		user = current_user
    @category = Category.find(params[:cat_id])
    feed = Feed.find(params[:feed_id])
    @category.feeds.delete(feed)

    @feeds = user.feeds
    @posts = user.all_posts
    @categories = user.categories

    render json: { message: 'Feed deleted', feeds: @feeds.to_json(:include => :categories), posts: @posts, categories: @categories.to_json(:include => :feeds) }

	end

end