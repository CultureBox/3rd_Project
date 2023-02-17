//login
export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';
export const LOGOUT_USER = 'logout_user';
export const AUTH_USER = 'auth_user';
export const COOKIE_USER = 'cookie_user';

// movie
export const MOVIE = 'movie';
export const BOOK = 'book';

// socket
// socket() 함수
export const SOCKET_INIT = 'socket/init';
// 방 목록 불러오기
export const SOCKET_ROOMS = 'socket/rooms';
// 방 목록 불러올 때의 메시지
export const SOCKET_MESSAGE = 'socket/rooms/message';
// 처음 접속 메시지
export const SOCKET_INIT_MESSAGE_ADD = 'socket/init/message/add';
// 메시지 보내기
export const SOCKET_MESSAGE_ADD = 'socket/message/add';
// 방 추가 메시지 (아직 사용 안함)
export const SOCKET_ROOM_ADD = 'socket/rooms/add';
// 사용자 연결 끊김 (사용 안할 것 같지만 보류)
export const SOCKET_LOGOUT = 'socket/user/disconnect';
