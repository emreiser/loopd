class CategoriesController < ApplicationController

	def new
		@category = Category.new
	end

	def create
		user = current_user
		@category = Category.new(category_params)
		user.categories.push(@category) unless user.categories.include? Category.find_by(name: @category.name)

		if @category.save
			flash['notice'] = 'Category added!'
      render json: @category;
    end
	end

	private

	def category_params
	  params.require(:category).permit(:name)
	end

end
