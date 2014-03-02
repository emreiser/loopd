class CreateCategoryFeedJoinTable < ActiveRecord::Migration
  def change
    create_join_table :feeds, :categories do |t|
      # t.index [:feed_id, :category_id]
      # t.index [:category_id, :feed_id]
    end
  end
end
