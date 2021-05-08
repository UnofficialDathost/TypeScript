export interface IAccount {
    id:                                string;
    email:                             string;
    gravatar_url:                      string;
    credits:                           number;
    seconds_left:                      number;
    time_left:                         string;
    roles:                             string[];
    trial:                             boolean;
    accepted_terms_of_service_version: number;
    subscription_pay_with_credits:     boolean;
    affiliate:                         boolean;
    first_month_discount_percentage:   number;
    confirmed_at:                      number;
}
