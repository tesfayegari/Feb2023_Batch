import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface INewEmployeesProps {
  description: string;
  isDarkTheme: boolean; 
  hasTeamsContext: boolean; 
  context: WebPartContext;
}
