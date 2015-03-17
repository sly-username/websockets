
import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

// DELETE ME
export default class EDUser {
  constructor( args, username, email, name, firstName, middleName, lastName, prefix, postfix, birthday ) {
    this.args = args
    args.username = username;
    args.email = email;
    args.name = name;
    args.name.first = firstName;
    args.name.middle = middleName;
    args.name.last = lastName;
    args.name.prefix = prefix;
    args.name.postfix = postfix;
    args.birthday = birthday;
  }
}
// END DELETE ME

export default class EDUser extends EDDataObject {
  static get TYPE() {
    return "user";
  }

  constructor( args ) {
    super();
    define.readOnly( this, [ "email", "email" ], args );
  }
}
