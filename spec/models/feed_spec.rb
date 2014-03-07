require 'spec_helper'

describe Feed do
  describe 'associations' do
  	it { should have_and_belong_to_many :categories }
  	it { should have_and_belong_to_many :users }
  end

  describe 'validations' do

  	it 'is invalid without a url' do
  		expect(Feed.create(name: 'NYT')).to_not be_valid
  	end

  	it 'is valid when all required fields are provided' do
  		expect(Feed.create(name: 'NYT', url: 'http://www.nytimes.com'))
  	end
  end

  describe 'get_rss_response' do
  end

  describe ".validate_feed" do
  end

  describe 'add_feed' do
  end

  describe 'update_feed' do
  end

  describe 'add_posts' do
  end

end
