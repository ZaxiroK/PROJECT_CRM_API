Rails.application.routes.draw do
  resources :support_tickets
  resources :meetings
  resources :contacts
  resources :clients
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :sessions, only: [:create, :destroy]

  match '/signin',  to: 'sessions#create',      via: 'post'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
end
