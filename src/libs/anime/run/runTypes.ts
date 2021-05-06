import { MediaList } from "../../../api/types";
import { SettingsProps } from "../../settings/settingsType";
import { Challenge } from "../animeTypes";

export interface MediaListReq extends MediaList {
  reqId: string;
}

export interface RunParams {
  mediaLists: MediaListReq[];
  settings: SettingsProps;
  challenge: Challenge;
  startDate: string;
}

export type RunFunction = (params: RunParams) => Promise<string>;
