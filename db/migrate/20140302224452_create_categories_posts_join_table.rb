class CreateCategoriesPostsJoinTable < ActiveRecord::Migration
  def change
    create_join_table :posts, :categories do |t|
      t.index [:post_id, :category_id]
      t.index [:category_id, :post_id]

      t.timestamps
    end
  end
end
