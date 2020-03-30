require "faker"

FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "Post - #{n}" }
    body { Faker::Hipster.sentence }
    image_url { "/root_url/some_file_name.jpg" }
    user
  end
end
