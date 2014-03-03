class AddFeedIdToPosts < ActiveRecord::Migration
  def change
    add_reference :posts, :feed, index: true
  end
end
