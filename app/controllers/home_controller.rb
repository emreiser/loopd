class HomeController < ApplicationController
	def index
    @category = Category.new
	end
end
