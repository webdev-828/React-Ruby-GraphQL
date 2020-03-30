require "faker"

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "secret12" }
    password_confirmation { "secret12" }
    profile
  end
end
