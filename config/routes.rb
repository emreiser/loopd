Loopd::Application.routes.draw do

  devise_for :users

  resources :users do
  	resources :posts
  end
  resources :feeds
  resources :categories

  post '/tag_feed' => 'tags#tag_feed', as: 'new_tag'

  root :to => 'home#index'
end
