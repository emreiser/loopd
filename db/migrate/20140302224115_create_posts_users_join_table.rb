class CreatePostsUsersJoinTable < ActiveRecord::Migration
  def change
    create_join_table :posts, :users do |t|
      t.index [:post_id, :user_id]
      t.index [:user_id, :post_id]

      t.timestamps
    end
  end
end
