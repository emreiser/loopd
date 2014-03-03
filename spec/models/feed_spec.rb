require 'spec_helper'

describe Feed do
  describe 'associations' do
  	it { should have_and_belong_to_many :categories }
  	it { should belong_to :user }
  end

  describe 'validations' do
  	it 'is invalid without a user id' do
  		expect(Feed.create(name: 'NYT', url: 'http://www.nytimes.com')).to_not be_valid
  	end

  	it 'is invalid without a name' do
  		expect(Feed.create(url: 'http://www.nytimes.com', user_id: 1)).to_not be_valid
  	end

  	it 'is invalid without a url' do
  		expect(Feed.create(name: 'NYT', user_id: 1)).to_not be_valid
  	end

  	it 'is valid when all required fields are provided' do
  		expect(Feed.create(name: 'NYT', url: 'http://www.nytimes.com', user_id: 1))
  	end
  end
end
