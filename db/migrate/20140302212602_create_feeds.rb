class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.text :name
      t.text :url

      t.timestamps
    end
  end
end
