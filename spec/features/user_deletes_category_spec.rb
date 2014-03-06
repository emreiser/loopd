# require 'spec_helper'

# feature 'User Signs In' do

# 	context 'when signed in', :js do
# 		background do
# 			@user = create(:user)
# 			visit root_path
# 			sign_in_as(@user)
# 		end

# 		scenario 'Deletes a category successfully' do
# 			find("#nav-bar-toggle-button").click
#       fill_in 'category_name', with: 'News'
#       click_on 'new-category-submit'
# 			find("#delete-button").click
# 			page.should_not have_content('News')
# 		end

# 		scenario 'Tries to add an empty category' do
# 			find("#nav-bar-toggle-button").click
#       fill_in 'category_name', with: ''
#       click_on 'new-category-submit'
# 			expect(page).to have_content('Category cannot be blank')
# 		end

# 		# scenario 'Enters invalid feed' do
# 		# 	fill_in 'Url', with: 'http://www.google.com'
# 		# 	click_on 'Add feed'
# 		# 	expect(page).to have_content("Invalid RSS feed")
# 		# end
# 	end
# end
