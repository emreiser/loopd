class Feed < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_and_belongs_to_many :categories
	has_many :posts

	validates :url, presence: true

	def get_rss_response
		Feedzirra::Feed.fetch_and_parse(self.url)
	end


	def self.validate_feed(rss_response)
		if rss_response == 200
			false
		else
			true
		end
	end

	def add_feed(rss_response)
		self.name = rss_response.title
		self.save
	end

	def update_feed(rss_response)
		self.add_posts(rss_response.entries)
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
