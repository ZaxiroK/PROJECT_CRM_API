class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.references :client, foreign_key: true
      t.string :NAME
      t.string :LAST_NAME
      t.string :EMAIL, unique: true
      t.string :PHONE
      t.string :JOB

      t.timestamps
    end
  end
end
