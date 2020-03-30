module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :posts,
          [Types::PostType],
          null: false,
          description: "Returns a list of all Blog Posts in the app"

    field :me, Types::UserType, null: true

    def posts
      Post.all
    end

    def me
      context[:current_user]
    end

  end
end
