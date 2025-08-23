import axios from 'axios';

const BASE_URL = `https://api.moyeoradingding.site/`;

export const getMyChatRoomListAPI = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/chats/rooms/`);
  return res.data;
};

export const createNewChatRoomAPI = async (groupName: string) => {
  const res = await axios.post(`${BASE_URL}/api/v1/chats/rooms/`, {
    room_name: `${groupName} 채팅방`,
  });
  return res.data;
};

export const getMyChatRoomDetailAPI = async (roomId: number) => {
  const res = await axios.get(`${BASE_URL}/api/v1/chats/rooms/${roomId}/`);
  return res.data;
};

export const putChatRoomDetailAPI = async (
  roomId: number,
  newRoomName: string,
) => {
  const res = await axios.put(`${BASE_URL}/api/v1/chats/rooms/${roomId}/`, {
    room_name: newRoomName,
  });
  return res.data;
};

export const patchChatRoomDetailAPI = async (
  roomId: number,
  newRoomName?: string,
) => {
  const res = await axios.put(`${BASE_URL}/api/v1/chats/rooms/${roomId}/`, {
    ...(newRoomName ? { room_name: newRoomName } : {}),
  });
  return res.data;
};

export const deleteChatRoomAPI = async (roomId: number) => {
  const res = await axios.delete(`${BASE_URL}/api/v1/chats/rooms/${roomId}/`);
  return res.data;
};

export const joinChatRoomAPI = async (roomId: number, roomName: string) => {
  const res = await axios.post(
    `${BASE_URL}/api/v1/chats/rooms/${roomId}/join/`,
    {
      room_name: roomName,
    },
  );
  return res.data;
};

export const leaveChatRoomAPI = async (roomId: number, roomName: string) => {
  const res = await axios.post(
    `${BASE_URL}/api/v1/chats/rooms/${roomId}/leave/`,
    {
      room_name: roomName,
    },
  );
  return res.data;
};

export const getChatMessageAPI = async (roomId: number) => {
  const res = await axios.get(
    `${BASE_URL}/api/v1/chats/rooms/${roomId}/messages/`,
  );
  return res.data;
};

export const getChatRoomParticipantsAPI = async (roomId: number) => {
  const res = await axios.get(
    `${BASE_URL}/api/v1/chats/rooms/${roomId}/participants/`,
  );
  return res.data;
};
