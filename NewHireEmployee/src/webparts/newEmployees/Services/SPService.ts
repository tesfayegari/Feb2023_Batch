import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export class SPService {

    constructor(private context: WebPartContext) { }

    readSharePointData(endPointUrl: string) {
        return this.context.spHttpClient.get(endPointUrl, SPHttpClient.configurations.v1)
            .then(response => response.json())
            .then(data => data);
    }

    readAllSPGroups() {
        //"siteUrl/_api/web/sitegroups?$filter=OwnerTitle ne 'System Account'"
        let url = this.context.pageContext.web.absoluteUrl + "/_api/web/sitegroups?$filter=OwnerTitle ne 'System Account'";

        return this.readSharePointData(url);

    }

    //read the most maxNumber new employees 
    readEmployeesItems(listId: string, maxNumber: number = 3) {
        //let url = `/_api/web/lists/getbytitle('${listName}')/items?$select=Biography,Employee/Title,Employee/EMail,Photo,HireDate&$top=${maxNumber}&$orderby=HireDate desc&$expand=Employee`;
        let url = `/_api/web/lists(guid'${listId}')/items?$select=Biography,Employee/Title,Employee/EMail,Photo,HireDate&$top=${maxNumber}&$orderby=HireDate desc&$expand=Employee`;
        let apiUrl = this.context.pageContext.web.absoluteUrl + url;
        return this.readSharePointData(apiUrl);
    }

    getAllSharePointLists() {
        let url = this.context.pageContext.web.absoluteUrl + "/_api/web/lists?$filter=Hidden eq false";
        return this.readSharePointData(url);
    }
}