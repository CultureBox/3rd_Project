import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
  SOCKET_MESSAGE_ADD,
  SOCKET_ROOM_REFRESH,
  SOCKET_LOGIN_UPDATE,
  SOCKET_ROOM_REFRESH_UPATE,
  SOCKET_PAGE_REFRESH,
  SOCKET_ROOM_MANAGER_LEAVE,
} from '../actions/types';

const initState = {
  roomList: [],
  message: [],
};

export default function socket_reducer(state = initState, action) {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, socket: action.payload };
    // 방 새로고침 클릭
    case SOCKET_ROOM_REFRESH_UPATE:
      const payloadRoomId = action.payload.room.roomId;
      const payloadMsg = action.payload.roomMsg;
      // console.log('payloadRoomId2', payloadRoomId2);
      // console.log('payloadMsg2', payloadMsg2);

      const updatedMessage = state.message.map((el) => {
        // console.log('el[payloadRoomId2]', el[payloadRoomId2]);
        if (el[payloadRoomId] != null) {
          // payloadMsg 개체의 데이터를 메시지 개체의 기존 데이터와 병합
          let baseData = Object.keys(payloadMsg);
          if (baseData.length >= Object.keys(el[payloadRoomId]).length) {
            for (let i = 0; i < baseData.length; i++) {
              if (el[payloadRoomId][i]) {
                // console.log('data 있');
                payloadMsg[i] = el[payloadRoomId][i];
              }
            }
          } else {
            // else 부분은 아직 정확하게 테스트를 못해봤습니다.
            for (let i = 0; i < Object.keys(el[payloadRoomId]).length; i++) {
              if (el[payloadRoomId][i]) {
                console.log('data 있2');
                payloadMsg[i] = el[payloadRoomId][i];
              }
            }
          }
          return {
            ...el,
            [payloadRoomId]: {
              ...payloadMsg,
            },
          };
        } else {
          // console.log('test Object.keys(payloadMsg2).length',Object.keys(payloadMsg2).length);
          // console.log('Object.keys(payloadMsg2)[0]', Object.keys(payloadMsg2)[0]);
          let newRoomData = {};
          for (let i = 0; i < Object.keys(payloadMsg).length; i++) {
            newRoomData[i] = payloadMsg[i];
          }
          // console.log('newRoomData', newRoomData);
          // const newRoomId = Object.keys(payloadMsg2)[0];
          return {
            ...el,
            // [payloadRoomId2]: {[newRoomId]: payloadMsg2[newRoomId],},
            [payloadRoomId]: newRoomData,
          };
        }
      });

      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.room.roomId,
          clientSocketId: action.payload.room.clientSocketId,
          clientUserId: action.payload.room.clientUserId,
        }),
        message: updatedMessage,
      };
    case SOCKET_INIT_MESSAGE_ADD:
      // console.log('action.payload.initSocketData', action.payload.initSocketData);
      const initMessage = [
        {
          ...state.message,
          [action.payload.initSocketData.roomId]: {
            0: {
              permission: action.payload.initSocketData.permission,
              content: action.payload.initSocketData.content,
              time: action.payload.initSocketData.time,
              socketId: action.payload.initSocketData.socketId,
              userId: action.payload.initSocketData.userId,
            },
          },
        },
      ];
      return {
        ...state,
        message: initMessage,
      };
    case SOCKET_ROOM_ADD:
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
        }),
      };
    case SOCKET_MESSAGE_ADD:
      // console.log('actionPayload', action.payload);
      const roomId = action.payload.roomId;
      const newMessage = action.payload.msg;
      const msgLength = action.payload.messageLength;
      const tempIndex = 0;

      // ...state.message.slice(0, tempIndex)은 state.message 배열에서
      // 0부터 tempIndex 인덱스까지의 요소를 새로운 배열로 만든 것입니다.
      // 이는 기존 배열의 해당 부분을 변경하지 않고 복사본을 만들기 위한 것입니다.
      // 그리고 이 복사본에 다음 요소들을 추가하고 다시 새로운 배열을 만듭니다.
      // ...state.message[tempIndex] : state.message 배열의 tempIndex 위치에 있는 요소를 복사합니다.
      // [roomId]: {...} : 해당 요소에서 roomId 프로퍼티를 갖는 객체를 새로 생성하여,
      // 그 내부에 있는 msgLength 프로퍼티를 갖는 객체를 newMessage로 설정합니다.
      // ...state.message.slice(tempIndex + 1) : 기존 배열에서 tempIndex 다음부터 마지막까지의 요소를 새로운 배열로 만듭니다.
      // 이러한 방식으로 기존의 state.message 배열을 변경하지 않고, 새로운 배열을 생성하고 그 배열을 반환합니다.
      // 이것은 Redux에서 불변성을 유지하면서 상태를 업데이트하는 일반적인 방법입니다.
      return {
        ...state,
        message: [
          ...state.message.slice(0, tempIndex),
          {
            ...state.message[tempIndex],
            [roomId]: {
              ...state.message[tempIndex][roomId],
              [msgLength]: newMessage,
            },
          },
          ...state.message.slice(tempIndex + 1),
        ],
      };

    // 관리자 - 방 새로고침 - roomList 초기화 후 재등록
    case SOCKET_ROOM_REFRESH:
      return {
        ...state,
        roomList: [],
        // message: [],
      };
    // // 로그인 - 해당 RoomID의 userID 업데이트
    case SOCKET_LOGIN_UPDATE:
      const roomData = action.payload.roomData;
      const userData = action.payload.userData;

      // console.log('action.payload.roomData', action.payload.roomData);
      // console.log('action.payload.userData', action.payload.userData);

      if (userData.permission === 'manager') {
        // console.log('manager');
        // 관리자인 경우 관리자 roomList 삭제
        const updateRoomList = state.roomList.filter(
          (el) => el.roomId !== roomData.roomId
        );
        return {
          ...state,
          roomList: updateRoomList,
        };
      } else {
        // 사용자인 경우 사용자 roomList 정보 업데이트
        const updateRoomList = state.roomList.map((el) => {
          // console.log(el);
          if (el.roomId === roomData.roomId) {
            return { ...el, clientUserId: userData.email };
          } else {
            return el;
          }
        });

        return {
          ...state,
          roomList: updateRoomList,
        };
      }
    // 새로고침 후 auth 정보 불러올 때 사용 (관리자인 경우 본인 방 안가져오도록 설정)
    case SOCKET_PAGE_REFRESH:
      // console.log('action.payload', action.payload);
      // console.log('state.roomList', state.roomList);
      if (action.payload.userData.permission === 'manager') {
        // 관리자인 경우 관리자 roomList 삭제
        const updateRoomList = state.roomList.filter(
          (el) => el.roomId !== action.payload.roomData
        );
        // console.log('updateRoomList', updateRoomList);
        return {
          ...state,
          roomList: updateRoomList,
        };
      } else {
        return { ...state };
      }
    // 관리자가 방 나가기를 수동으로 진행한 경우
    case SOCKET_ROOM_MANAGER_LEAVE:
      // console.log('action.payload', action.payload);
      const updateRoomList = state.roomList.filter(
        (el) => el.roomId !== action.payload
      );
      return {
        ...state,
        roomList: updateRoomList,
      };
    default:
      return state;
  }
}
