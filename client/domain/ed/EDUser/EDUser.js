import define from "domain/ed/define-properties";

var toStringTag = Symbol( "toStringTag" );

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

export default class EDDataObject extends EventEmitter {
  constructor( args ) {
    define.readOnly( this, [ "id", "name" ], args );
    define.readOnly( this, [ "type", "user" ], args );
    define.readOnly( this, [ "username", "username" ], args );
    define.readOnly( this, [ "email", "email" ], args );
  }
}
