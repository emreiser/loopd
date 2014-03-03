Loopd::Application.routes.draw do

  devise_for :users

  resources :users do
  	resources :posts
  end
  resources :feeds

  root :to => 'feeds#index'
end
