import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export class SPService {

    constructor(private context: WebPartContext) { }

    readSharePointData(endPointUrl: string) {
       return this.context.spHttpClient.get(endPointUrl, SPHttpClient.configurations.v1)
            .then(response=>response.json())
            .then(data => data);
    }

    // successFunc(data: any){
    //     console.log(data);
    // }

    readAllSPGroups(){
        //"https://spwada.sharepoint.com/sites/HumanResources2/_api/web/sitegroups?$filter=OwnerTitle ne 'System Account'"
        let url = this.context.pageContext.web.absoluteUrl + "/_api/web/sitegroups?$filter=OwnerTitle ne 'System Account'";

        return this.readSharePointData(url);

    }

    readSharePointItems(listName: string, filter: string) {
        //let url = this.context.pageContext.web.absoluteUrl;
    }

    getAllSharePointLists() {
        let url = this.context.pageContext.web.absoluteUrl + "/_api/web/lists?$filter=Hidden eq false";
        return this.readSharePointData(url);
    }
}