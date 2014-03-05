require 'spec_helper'

feature 'User Signs In' do

	context 'when signed in', :js do
		background do
			@user = create(:user)
			visit root_path
			sign_in_as(@user)
		end

		scenario 'Add a new feed successfully' do
			fill_in 'Url', with: 'http://www.nytimes.com/services/xml/rss/nyt/Politics.xml'
			click_on 'Add feed'
			click_on 'Toggle side-bar'
			expect(page).to have_content('NYT > Politics')
			page.save_screenshot('/tmp/pic.png')
		end

		scenario 'Tries to submit blank field' do
			fill_in 'Url', with: ''
			click_on 'Add feed'
			expect(page).to have_content("URL can't be blank")
		end

		scenario 'Enters invalid feed' do
			fill_in 'Url', with: 'http://www.google.com'
			click_on 'Add feed'
			expect(page).to have_content("Invalid RSS feed")
		end
	end
end
