# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

jack = User.create!(email: 'jack7@example.com', password: 'password')

cat1 = Category.create!(name: 'Cool Stuff')

feed1 = Feed.create!(name: 'News', url: 'www.nytimes.com', user_id: 1)

post = Post.create!(title: 'Test post', url: 'www.testy.com', author: 'This guy!', content: 'Something something dark side', pub_date: 'Last tuesday')

jack.posts.push(post)
