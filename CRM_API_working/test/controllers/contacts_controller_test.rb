require 'test_helper'

class ContactsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @contact = contacts(:one)
  end

  test "should get index" do
    get contacts_url, as: :json
    assert_response :success
  end

  test "should create contact" do
    assert_difference('Contact.count') do
      post contacts_url, params: { contact: { CLIENT_ID: @contact.CLIENT_ID, EMAIL: @contact.EMAIL, JOB: @contact.JOB, LAST_NAME: @contact.LAST_NAME, NAME: @contact.NAME, PHONE: @contact.PHONE } }, as: :json
    end

    assert_response 201
  end

  test "should show contact" do
    get contact_url(@contact), as: :json
    assert_response :success
  end

  test "should update contact" do
    patch contact_url(@contact), params: { contact: { CLIENT_ID: @contact.CLIENT_ID, EMAIL: @contact.EMAIL, JOB: @contact.JOB, LAST_NAME: @contact.LAST_NAME, NAME: @contact.NAME, PHONE: @contact.PHONE } }, as: :json
    assert_response 200
  end

  test "should destroy contact" do
    assert_difference('Contact.count', -1) do
      delete contact_url(@contact), as: :json
    end

    assert_response 204
  end
end
