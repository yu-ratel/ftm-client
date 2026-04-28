export type HashTagInfo = {
  value: string;
  description: string;
  isSelected: boolean;
};

export type UserInfo = {
  ageInfo: {
    value: string;
    description: string;
  };
  hashTagInfo: HashTagInfo[];
  imageUrl: string;
  userId: number;
  userNickname: string;
};

export type UserInfoResponse = {
  data: UserInfo;
};

export type UserInfoUpdateData = {
  nickname: string;
  age: string | null;
  imageAction?: string;
  hashtags: string[] | null;
};
