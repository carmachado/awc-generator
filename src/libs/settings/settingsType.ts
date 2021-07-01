export interface SettingsProps {
  notCompleted: string;
  watching: string;
  completed: string;
  prevCompleted: string;
  previewCards: boolean;
  language: { value: string; label: string };
  centerHeader: boolean;
  centerBody: boolean;
}
