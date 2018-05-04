class ApplicationController < ActionController::API
  before_action :authenticate

private
def authenticate
token = request.headers['HTTP_AUTHORIZATION']
  if @data = User.find_by(auth_token: token)
    true
  else
    render  status: :unauthorized
  end
end
end
