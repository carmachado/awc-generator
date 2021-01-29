import { MediaList } from "../../../api/getMediaList";
import { SettingsProps } from "../../settings/settingsType";

export interface RunParams {
  mediaLists: MediaListReq[];
  settings: SettingsProps;
}

export type RunFunction = (params: RunParams) => Promise<string>;

export interface MediaListReq extends MediaList {
  reqId: number;
}
