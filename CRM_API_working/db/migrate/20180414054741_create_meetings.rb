class CreateMeetings < ActiveRecord::Migration[5.1]
  def change
    create_table :meetings do |t|
      t.string :TITLE
      t.string :date
      t.string :time
      t.references :user, foreign_key: true
      t.boolean :IS_VITUAL
      t.references :client, foreign_key: true

      t.timestamps
    end
  end
end
