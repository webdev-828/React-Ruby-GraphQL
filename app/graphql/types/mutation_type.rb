=begin
  in order to add a new mutation you need to complete the following steps:

   1.) Add a class implementing the mutation logic, which includes:
  2.) the input type definition (arguments);
  3.) the return type definition;
  4.) the #resolve method.
 5.) Add a new entry to MutationType.
=end

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::SignInMutation
  end
end
