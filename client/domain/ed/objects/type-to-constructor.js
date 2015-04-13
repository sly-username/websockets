
// Media Types
import EDTrack from "domain/ed/objects/media/EDTrack";

// User
import EDUser from "domain/ed/objects/EDUser";

// Profile Types
import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDFan from "domain/ed/objects/profile/EDFan";


// Misc Types
import EDBadge from "domain/ed/objects/EDBadge";
import EDGenre from "domain/ed/objects/EDGenre";


export default {
  [ EDTrack.TYPE ]: EDTrack,
  [ EDUser.TYPE ]: EDUser,
  [ EDArtist.TYPE ]: EDArtist,
  [ EDFan.TYPE ]: EDFan,
  [ EDBadge.TYPE ]: EDBadge,
  [ EDGenre.TYPE ]: EDGenre
};
