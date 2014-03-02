Loopd::Application.routes.draw do

  devise_for :users
  resources :feed

  root :to => 'feeds#index'
end
