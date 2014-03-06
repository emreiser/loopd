class HomeController < ApplicationController
	def index
		if user_signed_in?
			redirect_to feeds_path
		end
    @category = Category.new
	end
end
