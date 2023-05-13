import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, PropertyPaneSlider } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';


import NewEmployees from './components/NewEmployees';
import { INewEmployeesProps } from './components/INewEmployeesProps';

export interface INewEmployeesWebPartProps {
  description: string;
  lists: string | string[]; // Stores the list ID(s)
  maxEmployee: number;
}

export default class NewEmployeesWebPart extends BaseClientSideWebPart<INewEmployeesWebPartProps> {

  private _isDarkTheme: boolean = false;
  //private _environmentMessage: string = '';

  public render(): void {
    let bootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css";
    SPComponentLoader.loadCss(bootstrap);

    const element: React.ReactElement<INewEmployeesProps> = React.createElement(
      NewEmployees,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,       
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        context: this.context,
        listID: this.properties.lists,
        maxEmployee: this.properties.maxEmployee       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onInit(): Promise<void> {
  //   return this._getEnvironmentMessage().then(message => {
  //     this._environmentMessage = message;
  //   });
  // }

  
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }




  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Webpart Settings'
          },
          groups: [
            {
              groupName: 'General settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Name'
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select Employee list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneSlider('maxEmployee', {
                  min: 2,
                  max: 9,
                  label: 'Maximum Number of Employee',
                  value: 3
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
