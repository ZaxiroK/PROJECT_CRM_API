class CreateClients < ActiveRecord::Migration[5.1]
  def change
    create_table :clients do |t|
      t.string :NAME
      t.string :IDENTITY_CARD
      t.string :WEB_PAGE
      t.string :ADDRESS
      t.string :PHONE
      t.string :SECTOR

      t.timestamps
    end
  end
end
