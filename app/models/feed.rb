class Feed < ActiveRecord::Base
	belongs_to :user
	has_and_belongs_to_many :categories

	validates :user_id, presence: true
	validates :name, presence: true
	validates :url, presence: true
end
