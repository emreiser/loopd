class AddGuidToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :guid, :text
  end
end
