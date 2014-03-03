class FeedsController < ApplicationController
  def actions
  end

  def index
    @user = current_user
    @feed = Feed.new
  end

  def new
  end

  def create
  end

  def show
  end
end
