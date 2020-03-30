module Types
  class ProfileType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false

    field :full_name, String, null: false

    def full_name
      # object references the user instance, compact removes any nil values
      [object.first_name, object.last_name].compact.join(" ")
    end
  end
end
