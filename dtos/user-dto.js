class UserDto {
    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.username = model.username
        this.isAdmin = model.isAdmin
    }
}

export default UserDto