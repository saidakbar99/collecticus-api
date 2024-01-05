class UserDto {
    constructor(model) {
        this.email = model.email
        this.id = model._id
    }
}

export default UserDto