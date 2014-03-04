require 'spec_helper'

feature 'User Signs In' do

	background do
		@user = create(:user)
		visit root_path
		sign_in_as(@user)
	end

	scenario 'Add a new feed successfully' do
		fill_in 'Url', with: 'http://www.nytimes.com/services/xml/rss/nyt/Politics.xml'
		click_on 'Add feed'
		expect(page).to have_content('NYT > Politics')
	end

	scenario 'Tries to submit blank field' do
		fill_in 'Url', with: ''
		click_on 'Add feed'
		expect(page).to have_content("URL can't be blank")
	end
end
