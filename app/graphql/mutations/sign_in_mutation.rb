module Mutations
  class SignInMutation < Mutations::BaseMutation
    graphql_name "SignIn"
    # always need arguments for a mutation and defined here at the top
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true

    def resolve(email:, password:)
      # find the user based on the email argument provided to the mutation
      user = User.find_for_database_authentication(email: email)

      if user.present?
        # Check that the password for the fetched user, matches the one provided by mutation
        if user.valid_password?(password: password)
          context[:current_user] = user

          # TODO:: change this?
          return user
        else
          GraphQL::ExecutionError.new("Incorrect Email/Password")
        end
      else
        GraphQL::ExecutionError.new("User with #{email} not registered on this application")
      end
    end
  end
end
