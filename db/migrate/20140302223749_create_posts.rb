class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :title
      t.text :url
      t.text :author
      t.text :content
      t.time :pub_date

      t.timestamps
    end
  end
end
