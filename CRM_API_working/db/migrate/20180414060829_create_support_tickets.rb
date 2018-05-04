class CreateSupportTickets < ActiveRecord::Migration[5.1]
  def change
    create_table :support_tickets do |t|
      t.string :PROBLEM_TITTLE
      t.string :PROBLEM_DETAIL
      t.references :client, foreign_key: true
      t.references :user, foreign_key: true
      t.string :STATUS

      t.timestamps
    end
  end
end
