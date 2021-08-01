export interface LoginUserDto{
    username:string,
    password:string
}

interface User{
    username:string
}

export interface LoginUserResponseDto{
    token:string,
    user:User,
}