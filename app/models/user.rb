class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :feeds
  has_and_belongs_to_many :posts
  has_many :categories

  def update_all_feeds
    feeds = self.feeds

    feeds.each do |feed|
      response = feed.get_rss_response
      feed.update_feed(response)
    end
  end

  def all_posts
  	self.feeds.includes(:posts).map{ |f| f.posts }.flatten
  end
end
