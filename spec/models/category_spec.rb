require 'spec_helper'

describe Category do
	describe 'associations' do
		it { should have_and_belong_to_many :feeds }
		it { should have_and_belong_to_many :posts }
	end

	describe 'validations' do

		it 'is invalid without a name' do
			expect(Category.create).to_not be_valid
		end

		it 'is valid when a name is provided' do
			expect(Category.create(name: 'news')).to be_valid
		end
	end
end
