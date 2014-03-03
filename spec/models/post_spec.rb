require 'spec_helper'

describe Post do
	it { should have_and_belong_to_many :categories }
  it { should have_and_belong_to_many :users }
end
