require 'spec_helper'

feature 'User Signs In' do

	background do
		@user = create(:user)
		visit root_path
		sign_in_as(@user)
	end

	scenario 'Add a new feed' do
		fill_in 'Url', with: 'http://www.rssmicro.com/?q=Obama'
		expect(page).to have_content
	end

end
