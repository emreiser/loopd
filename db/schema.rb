# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140304144949) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: true do |t|
    t.text     "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  add_index "categories", ["user_id"], name: "index_categories_on_user_id", using: :btree

  create_table "categories_feeds", id: false, force: true do |t|
    t.integer  "feed_id",     null: false
    t.integer  "category_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "categories_feeds", ["category_id", "feed_id"], name: "index_categories_feeds_on_category_id_and_feed_id", using: :btree
  add_index "categories_feeds", ["feed_id", "category_id"], name: "index_categories_feeds_on_feed_id_and_category_id", using: :btree

  create_table "categories_posts", id: false, force: true do |t|
    t.integer  "post_id",     null: false
    t.integer  "category_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "categories_posts", ["category_id", "post_id"], name: "index_categories_posts_on_category_id_and_post_id", using: :btree
  add_index "categories_posts", ["post_id", "category_id"], name: "index_categories_posts_on_post_id_and_category_id", using: :btree

  create_table "feeds", force: true do |t|
    t.text     "name"
    t.text     "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "feeds_users", id: false, force: true do |t|
    t.integer "feed_id", null: false
    t.integer "user_id", null: false
  end

  create_table "posts", force: true do |t|
    t.text     "title"
    t.text     "url"
    t.text     "author"
    t.text     "content"
    t.text     "pub_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "summary"
    t.integer  "feed_id"
    t.text     "guid"
  end

  add_index "posts", ["feed_id"], name: "index_posts_on_feed_id", using: :btree

  create_table "posts_users", id: false, force: true do |t|
    t.integer  "post_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts_users", ["post_id", "user_id"], name: "index_posts_users_on_post_id_and_user_id", using: :btree
  add_index "posts_users", ["user_id", "post_id"], name: "index_posts_users_on_user_id_and_post_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
