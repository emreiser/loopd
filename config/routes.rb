Loopd::Application.routes.draw do

  devise_for :users

  resources :users do
  	resources :feeds
  	resources :posts
  end

  root :to => 'feeds#index'
end
