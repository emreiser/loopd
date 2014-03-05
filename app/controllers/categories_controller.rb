class CategoriesController < ApplicationController

	def new
		@category = Category.new
	end

	def create
		user = current_user
		@category = Category.new(category_params)

		if user.categories.include? Category.find_by(name: @category.name)
			render json: { message: 'Category already exists' }
    else
    	user.categories.push(@category)
      render json: { message: 'Category added', category: @category }
    end
	end

	private

	def category_params
	  params.require(:category).permit(:name)
	end

end
