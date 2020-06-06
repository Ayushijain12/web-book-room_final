export interface UserLoginModel {
    userid?: string;
    group_id?: string;
    name?: string;
    Username?: string;
    CookieID?: string;
    Password?: string;
    status?: string;
}
export interface ForgetPasswordinfo {
    email: string;
}
export interface ChangePasswordinfo {
    otp: string;
    password: string;
    confirm_password: string;
}
export interface User_01Model {
    id: string;
    group_id: string;
    username: string;
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    phone_number: string;
    group_name: string;
    password: string;
}
export interface Room_01Model {
    id?: string;
    name: string;
    desription : string;
    status: string;
}
export interface Book_01Model {
    start_time : string;
}
