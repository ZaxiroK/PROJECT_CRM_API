class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :NAME
      t.string :LAST_NAME
      t.string :USER_NAME, unique: true
      t.string :PASSWORD_DIGGEST
      t.string :PASSWORD
      t.string :PASSWORD_CONFIRMATION
      t.string :auth_token
      t.boolean :admin

      t.timestamps
    end
  end
end
