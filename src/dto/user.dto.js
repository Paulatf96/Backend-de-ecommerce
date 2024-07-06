class UserDTO {
  constructor(first_name, last_name, rol, email, lastConnection) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.fullname = `${first_name} ${last_name}`;
    this.rol = rol;
    this.email = email;
    this.lastConnection = lastConnection;
  }
}
module.exports = UserDTO;
