module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :body, String, null: true
    field :image_url, String, null: true

    field :user, Types::UserType, null: false
  end
end
