# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

test = User.create!(email: 'jack7@example.com', password: 'password')
feed1 = Feed.create!(url: 'http://rss.cnn.com/rss/cnn_topstories.rss')
response = feed1.get_rss_response
feed1.add_feed(response)
feed1.update_feed(response)

