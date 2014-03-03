class Feed < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_and_belongs_to_many :categories

	validates :user_id, presence: true
	validates :url, presence: true
end
