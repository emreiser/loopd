require 'spec_helper'

feature 'User Signs In' do

	background do
		@user = create(:user)
		visit root_path
	end

	scenario 'Signs in successfully' do
		sign_in_as(@user)
		expect(page).to have_content('jack@jj.com')
	end

end
