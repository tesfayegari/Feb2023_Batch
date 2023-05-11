import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { SPService } from './Services/SPService';



export interface IHelloWorldWebPartProps {
  description: string;//description/webpart title
  test: string;//multiline
  test1: boolean;//checkbox
  test2: string;//dropdown
  test3: boolean;//toggle
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  service: SPService;
  spGroups: any[];
  spLists: any[];

  public render(): void {
    //this.service.readAllSPGroups().then(groups => console.log('Groups are ', groups));
    //this.service.getAllSharePointLists().then(lists => console.log('Groups are ', lists));

    let bootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css";
    SPComponentLoader.loadCss(bootstrap);

    let tempHtml = '<div class="list-group">';
    for(let g of this.spGroups){
      tempHtml += `<a href="#" class="list-group-item list-group-item-action">${g.LoginName}</a>`
    }
    tempHtml += "</div>";

    let tempHtml1 = '<div class="list-group">';
    for(let l of this.spLists){
      tempHtml1 += `<a href="#" class="list-group-item list-group-item-action">${l.Title + ' (' + l.ItemCount + ' items)'}</a>`
    }
    tempHtml1 += "</div>";


    this.domElement.innerHTML = `
                      <h3 class="${this.properties.test1 ? 'd-none' : ''}">${this.properties.description}</h3>
                      <div class="p-2 jumbotron text-center">
                        <h3>SP Groups in ${this.context.pageContext.web.title}</h3>   
                        
                      </div>
                      <div class="container">
                        ${tempHtml}
                        <h3>All sharepoint lists in the site </h3>
                        ${tempHtml1}
                      </div>`;
  }

  protected onInit(): Promise<void> {
    if (this.service == undefined || this.service == null)
      this.service = new SPService(this.context);
    return this.service.readAllSPGroups().then(groups => {
      console.log('Groups are ', groups);
      this.spGroups = groups.value;
      return this.service.getAllSharePointLists()
        .then(lists => {
          console.log('Lists are ', lists);
          this.spLists = lists.value;
        })
    });

  }



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Settings'//strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: 'General Setting',//strings.BasicGroupName,
              groupFields: [
                PropertyPaneCheckbox('test1', {
                  text: 'Hide Title'
                }),
                PropertyPaneTextField('description', {
                  label: 'Webpart Title'//strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test', {
                  label: 'Multiline Text',//strings.DescriptionFieldLabel
                  multiline: true
                }),

                PropertyPaneToggle('test3', {
                  label: 'Disable Choice',
                  onText: 'Active',
                  offText: 'Inactive'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  disabled: !this.properties.test3,
                  options: [
                    { key: 'One', text: 'One' },
                    { key: 'Two', text: 'Two' },
                    { key: 'Three', text: 'Three' },
                    { key: 'Four', text: 'Four' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
