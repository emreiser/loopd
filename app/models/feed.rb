class Feed < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_and_belongs_to_many :categories
	has_many :posts

	validates :url, presence: true

	def update_feed
		feed = Feedzirra::Feed.fetch_and_parse(self.url)
		self.add_posts(feed.entries)
	end

	def add_posts(entries)
		entries.each do |entry|
			unless Post.find_by(guid: entry.id).present?
				self.posts.create!(
					title: entry.title,
					url: entry.url,
					author: entry.author,
					summary: entry.summary,
					content: entry.content,
					pub_date: entry.published,
					guid: entry.id)
			end
		end
	end
end
