import { MediaList } from "../../../api/types";
import { SettingsProps } from "../../settings/settingsType";

export interface MediaListReq extends MediaList {
  reqId: number;
}

export interface RunParams {
  mediaLists: MediaListReq[];
  settings: SettingsProps;
}

export type RunFunction = (params: RunParams) => Promise<string>;
