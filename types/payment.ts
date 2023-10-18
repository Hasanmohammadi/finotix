export interface PostCreatePaymentI {
  InvoiceCode: string
  PaymentItems: PaymentItem[]
}

export interface PaymentItem {
  PaymentTypeID: number
  Amount: number
  PaymentProps?: PaymentProps
}

export interface PaymentProps {
  CallbackURL?: string
  AgencyBankID?: number
  CouponCode?: string
  OrganizationCode: any
  AdditionalData: any
}

export interface CreatePaymentDataI {
  InvoiceCode: string
  PaymentedAmount: number
  TotalAmount: number
  CurrencyCode: string
  PaymentItemsResult: []
}
