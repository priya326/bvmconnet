const mainDomain = "http://localhost:8050/";

exports.addClub = mainDomain + "addClub";
exports.getClub = (clubId) => `${mainDomain}getClub/${clubId}`;

exports.editClub = `http://localhost:8050/editClub`;
exports.login = mainDomain + "login";
exports.getClubs = mainDomain + "getClubs";
exports.getPastEvents = mainDomain + "getPastEvents";
exports.getDepartment = mainDomain + "getDepartments";
exports.eventStatusUpdate = mainDomain + "eventStatusUpdate";
exports.getPermission = mainDomain + "permissionLetter";
exports.getData = mainDomain + "getData";
exports.getSessionAttendance = mainDomain + "getSessionAttendance";
exports.getUpcomingEvents = mainDomain + "getUpcomingEvents";
exports.eventStatusUpdate = mainDomain + "eventStatusUpdate";
exports.getEventPermissionDocument = mainDomain + "getEventPermissionDocument";
exports.addClubCoordinator = mainDomain + "addClubCoordinator";
exports.removeClubCoordinator = mainDomain + "removeClubCoordinator";
