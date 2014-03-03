class Post < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :users

  validates :title, presence: true
  validates :url, presence: true
end
