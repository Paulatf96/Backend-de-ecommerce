class UserDTO {
  constructor(first_name, last_name,rol) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.fullname = `${first_name} ${last_name}`;
    this.rol = rol;
  }
}
 module.exports = UserDTO