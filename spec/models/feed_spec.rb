require 'spec_helper'

describe Feed do
  describe 'associations' do
  	it { should have_and_belong_to_many :categories }
  	it { should belong_to :user }
  end
end
