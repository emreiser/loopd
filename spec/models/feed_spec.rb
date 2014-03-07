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
      response = @cabosanlupus.get_rss_response
      @cabosanlupus.add_feed(response)
      @cabosanlupus.update_feed(response)
    end

    it 'should return the name of the feed based on rss response title' do
      expect(@cabosanlupus.name).to eq('cabo san lupus')
    end
    it 'should save the feed' do
      expect(@cabosanlupus.save).to be true
    end
  end

  describe '#update_feed' do
    before :each do
      @cabosanlupus = Feed.create(name: 'cabo san lupus', url: 'http://cabosanlupus.tumblr.com/rss')
      response = @cabosanlupus.get_rss_response
      @cabosanlupus.add_feed(response)
      @cabosanlupus.update_feed(response)
    end

    it 'should populate feed with entries from rss response' do
      expect(@cabosanlupus.add_posts(response.entries.first.title)).to be_instance_of('string')
    end
  end

  describe '#add_posts' do
    before :each do
      @cabosanlupus = Feed.create(name: 'cabo san lupus', url: 'http://cabosanlupus.tumblr.com/rss')
      response = @cabosanlupus.get_rss_response
      @cabosanlupus.add_feed(response)
      @cabosanlupus.update_feed(response)
    end

    it 'should create posts from returned data' do
      expect(@cabosanlupus.add_posts(entries)).to contain(:title, :summary)
    end
  end
end













# none of these are passing due to changes in
# models. the tests above are only passing because
#'name' has been directly passed in, and the
#'save' function works.

      # the below fix was added by emilie directly
      # to this spec file, but didn't work.
      # fix should have been made
      # to the .rb model file, but recent changes
      # made it difficult to adjust the testing.

      # response = @cabosanlupus.get_rss_response
      # @cabosanlupus.add_feed(response)
      # @cabosanlupus.update_feed(response)
