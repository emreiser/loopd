class AddSummaryToPost < ActiveRecord::Migration
  def change
    add_column :posts, :summary, :text
  end
end
