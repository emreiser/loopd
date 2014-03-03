require 'spec_helper'

describe Post do
	describe 'associations' do
		it { should have_and_belong_to_many :categories }
	  it { should have_and_belong_to_many :users }
	end

	describe 'validations' do
		it 'is invalid without a title' do
			expect(Post.create(url: 'http://www.nytimes.com', author: 'Joe Bob', content: 'Stuff', pub_date: 'Yesterday')).to_not be_valid
		end

		it 'is invalid without a url' do
			expect(Post.create(title: 'Fun stuff!', author: 'Joe Bob', content: 'Stuff', pub_date: 'Yesterday')).to_not be_valid
		end
	end
end
