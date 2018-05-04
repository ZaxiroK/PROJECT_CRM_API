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

ActiveRecord::Schema.define(version: 20180414060829) do

  create_table "clients", force: :cascade do |t|
    t.string "NAME"
    t.string "IDENTITY_CARD"
    t.string "WEB_PAGE"
    t.string "ADDRESS"
    t.string "PHONE"
    t.string "SECTOR"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.integer "client_id"
    t.string "NAME"
    t.string "LAST_NAME"
    t.string "EMAIL"
    t.string "PHONE"
    t.string "JOB"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_contacts_on_client_id"
  end

  create_table "meetings", force: :cascade do |t|
    t.string "TITLE"
    t.string "date"
    t.string "time"
    t.integer "user_id"
    t.boolean "IS_VITUAL"
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_meetings_on_client_id"
    t.index ["user_id"], name: "index_meetings_on_user_id"
  end

  create_table "support_tickets", force: :cascade do |t|
    t.string "PROBLEM_TITTLE"
    t.string "PROBLEM_DETAIL"
    t.integer "client_id"
    t.integer "user_id"
    t.string "STATUS"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_support_tickets_on_client_id"
    t.index ["user_id"], name: "index_support_tickets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "NAME"
    t.string "LAST_NAME"
    t.string "USER_NAME"
    t.string "PASSWORD_DIGGEST"
    t.string "PASSWORD"
    t.string "PASSWORD_CONFIRMATION"
    t.string "auth_token"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
