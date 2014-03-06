require 'spec_helper'

feature 'Visitor signs up' do

	scenario 'register as a user' do
		visit root_path
		click_on 'Create an Account'
		fill_in 'Email', with: 'jack@aol.com'
		fill_in 'Password', with: 'password1'
		fill_in 'Password confirmation', with: 'password1'
		click_button 'Sign up'
		expect(page).to have_content('jack@aol.com')
	end

end
