require "rails_helper"

RSpec.describe Types::MutationType do
  describe "sign in" do
    before(:each) do
      # Setup the GQL mutation variables
      @variables = {
        "email" => "testUser@example.com",
        "password" => "123456",
        "password_confirmation" => "123456",
      }
    end

    let(:mutation) do
      %(
       mutation signIn($email: String!, $password: String!){
        signIn(input: {email: $email, password: $password}){
          user{
            id
            email
            profile{
              fullName
            }
            authenticationToken
          }
          success
          errors
        }
       }
     )
    end

    subject(:result) do
      DujotaStudiosSchema.execute(mutation).as_json
    end

    it "signs a user in" do
      # Create and save one user.
      user = create(:user, **@variables.symbolize_keys)

      binding.pry
    end
  end
end
