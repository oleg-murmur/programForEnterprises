export class CreateUserDto {
    email: string
    password: string
    role?: 'admin' | 'employee' | 'editor'
    token?: string
    fullName?: string
}
