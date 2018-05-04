class SupportTicketsController < ApplicationController
  before_action :set_support_ticket, only: [:show, :update, :destroy]
  skip_before_action :authenticate, only: [:create, :index, :show, :update, :destroy]

  # GET /support_tickets
  def index
    @support_tickets = SupportTicket.all

    render json: @support_tickets
  end

  # GET /support_tickets/1
  def show
    render json: @support_ticket
  end

  # POST /support_tickets
  def create
    @support_ticket = SupportTicket.new(support_ticket_params)

    if @support_ticket.save
      render json: @support_ticket, status: :created, location: @support_ticket
    else
      render json: @support_ticket.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /support_tickets/1
  def update
    if @support_ticket.update(support_ticket_params)
      render json: @support_ticket
    else
      render json: @support_ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE /support_tickets/1
  def destroy
    @support_ticket.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_support_ticket
      @support_ticket = SupportTicket.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def support_ticket_params
      params.require(:support_ticket).permit(:PROBLEM_TITTLE,:PROBLEM_DETAIL,:client_id,:user_id,:STATUS)
    end
end
