class User < ApplicationRecord
    # has_many :categories, dependent: :destroy
 
     before_create :set_auth_token
     before_save :downcase_fields
     #has_secure_password
 
     validates :USER_NAME, presence: true, length: { maximum: 50, minimum: 3 },
     uniqueness: { case_sensitive: false }
 
 
     private
 
     def downcase_fields
         self.USER_NAME = self.USER_NAME.downcase
     end
 
     def set_auth_token
         return if auth_token.present?
         self.auth_token = generate_auth_token
     end
 
     def generate_auth_token
         SecureRandom.uuid.gsub(/\-/,'')
     end
 end

