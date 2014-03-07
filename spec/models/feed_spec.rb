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
  		expect(Feed.create(name: 'NYT', url: 'http://www.nytimes.com')).to be_valid
  	end
  end

  describe 'add_feed' do
    before :each do
      @cabosanlupus = Feed.create(name: 'cabo san lupus', url: 'http://cabosanlupus.tumblr.com/rss')
    end

    it 'should return the name of the feed based on rss response title' do
      expect(@cabosanlupus.name).to eq('cabo san lupus')
    end
    it 'should save the feed' do
      expect(@cabosanlupus.save).to be true
    end
  end

  describe '#update_feed' do
  end

  describe '#add_posts' do
  end

end
