import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
  SOCKET_MESSAGE_ADD,
  SOCKET_ROOM_REFRESH,
  SOCKET_LOGIN_UPDATE,
  SOCKET_ROOM_REFRESH_UPATE,
  SOCKET_PAGE_REFRESH,
} from './types';

export function socketInit(socket) {
  return {
    type: SOCKET_INIT,
    payload: socket,
  };
}

// 테스트
export function socketRoomsRefreshUpdate(roomData) {
  const tempMsg = [];
  for (let i = 0; i < roomData.msg.length; i++) {
    tempMsg.push(roomData.msg[i]);
  }
  return {
    type: SOCKET_ROOM_REFRESH_UPATE,
    payload: { room: roomData, roomMsg: tempMsg },
  };
}

export function socketInitMessageAdd(msg) {
  return {
    type: SOCKET_INIT_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsAdd(roomData) {
  return {
    type: SOCKET_ROOM_ADD,
    payload: roomData,
  };
}

export function socketMessageAdd(msg) {
  return {
    type: SOCKET_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsRefresh() {
  return {
    type: SOCKET_ROOM_REFRESH,
  };
}

export function socketUserLogin(roomData, userData) {
  // console.log('roomData action', roomData);
  // console.log('userData action', userData);
  return {
    type: SOCKET_LOGIN_UPDATE,
    payload: { roomData, userData },
  };
}

export function socketPageRefresh(roomData, userData) {
  // console.log('roomData', roomData);
  // console.log('userData', userData);
  return {
    type: SOCKET_PAGE_REFRESH,
    payload: { roomData, userData },
  };
}
