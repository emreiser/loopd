require 'spec_helper'

describe User do
	describe 'associations' do
		it { should have_many :feeds }
		it { should have_and_belong_to_many :posts }
	end
end
