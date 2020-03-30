class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_many :posts, dependent: :destroy
  has_one :profile, autosave: true

  delegate :first_name, :first_name=,
           :last_name, :last_name=,
           :full_name, :full_name=,
           to: :profile
end
