export interface InterFaceListData {
  _id: number;
  title: string;
  type: string;
  color: string;
  isChecked: boolean;
  created_at: Date;
  reminder_at: Date;
  updated_at: Date;
}

export interface InterFaceTypeData {
  id: any,
  title: string;
  tasks: number | string;
  color: string;
  image: string;
  created_at: Date;
}

export interface InterFaceCommonType {
  count: number;
  title: string;
}

export interface InterFaceAddStaticData {
  id: number,
  title: string,
  tasks: number | string,
  isFullCircle: boolean,
  color: string,
  image: string,
}

export interface InterFaceAddDataList {
  id: number,
  title: string,
  color: string,
}