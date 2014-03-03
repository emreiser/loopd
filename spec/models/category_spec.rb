require 'spec_helper'

describe Category do
	describe 'associations' do
		it { should have_and_belong_to_many :feeds }
		it { should have_and_belong_to_many :posts }
	end
end
