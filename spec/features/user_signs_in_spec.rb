require 'spec_helper'

feature 'User Signs In' do

	background do
		User.create(email: 'jack@jack.com', password: 'password1')
	end

	scenario 'Sign in successfully' do
		visit root_path
		click_on 'Sign in'
		fill_in 'Email', with: 'jack@jack.com'
		fill_in 'Password', with: 'password1'
		click_button 'Sign in'
		expect(page).to have_content('jack@jack.com')
	end

end
