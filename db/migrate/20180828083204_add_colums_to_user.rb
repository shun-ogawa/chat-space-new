class AddColumsToUser < ActiveRecord::Migration[5.0]
  def change
      ## Trackable
      add_column :users, :sign_in_count, :integer, :default => 0
      add_column :users, :current_sign_in_at, :datetime
      add_column :users, :last_sign_in_at, :datetime
      add_column :users, :current_sign_in_ip, :string
      add_column :users, :last_sign_in_ip, :string
       ## Confirmable
      add_column :users, :confirmation_token, :string
      add_column :users, :confirmed_at, :datetime
      add_column :users, :confirmation_sent_at, :datetime
      add_column :users, :unconfirmed_email, :string # Only if using reconfirmable

      ## Lockable
      add_column :users, :failed_attempts, :integer, default: 0, null: false # Only if lock strategy is :failed_attempts
      add_column :users, :unlock_token, :string # Only if unlock strategy is :email or :both
      add_column :users, :locked_at, :datetime
  end
end
