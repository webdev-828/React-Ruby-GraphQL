class Profile < ApplicationRecord
  belongs_to :user, optional: true
  validates_presence_of :first_name, :last_name

  def full_name
    "#{first_name} #{last_name}".strip
  end
end
