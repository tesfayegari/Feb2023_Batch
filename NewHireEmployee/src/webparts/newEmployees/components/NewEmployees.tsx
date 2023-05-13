import * as React from 'react';
import styles from './NewEmployees.module.scss';
import { INewEmployeesProps } from './INewEmployeesProps';
import { EmployeeWidget } from './EmployeeWidget';
import { SPService } from '../Services/SPService';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export interface INewEmployeesState {
  maxNumber: number;
  employees: any[];
}

export default class NewEmployees extends React.Component<INewEmployeesProps, INewEmployeesState> {
  //myNum: number = 0;
  service: SPService;
  constructor(props: INewEmployeesProps) {
    super(props);
    this.state = { maxNumber: 0, employees: [] }
    this.service = new SPService(this.props.context)
  }

  componentDidMount(): void {
    this.props.listID && this.service.readEmployeesItems(this.props.listID as string, this.props.maxEmployee)
      .then(empls => {
        console.log('Employees are ', empls);
        this.setState({ employees: empls.value });
      })
  }

  // private increaseNum() {
  //   let myNum = this.state.myNumber;
  //   myNum++;
  //   this.setState({ myNumber: myNum });
  //   console.log('Increase is called', myNum);
  // }
  // private decreaseNum() {
  //   let myNum = this.state.myNumber;
  //   myNum--;
  //   this.setState({ myNumber: myNum });
  //   console.log('Decrease is called', myNum);
  // }
  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<INewEmployeesProps> {
    console.log('Props are ', this.props)
    return (
      <section className={`${styles.newEmployees} ${this.props.hasTeamsContext ? styles.teams : ''}`}>
        <div className="p-2 mb-0 jumbotron">
          <h3>{this.props.description}</h3>
        </div>
        <div className="container-fluid">
          {/* <h3>{this.state.myNumber}</h3>
          <button className="btn btn-primary m-1" onClick={() => this.increaseNum()}>+</button>
          <button className="btn btn-primary m-1" onClick={() => this.decreaseNum()}>-</button> */}

          {this.props.listID == null || this.props.listID == undefined || this.props.listID == '' && <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure}
          //theme={this.props.themeVariant} 
          />}

          <div className="row my-1">
            {
              this.state.employees.map(emp => (
                <div className="col-md-4 mb-1">
                  <EmployeeWidget
                    name={emp.Employee.Title}
                    email={emp.Employee.EMail}
                    bio={emp.Biography.substring(0,60) + " ...."}
                    photo={emp.Photo == null ? this.props.context.pageContext.web.absoluteUrl + `/_layouts/15/userphoto.aspx?size=L&username=${emp.Employee.EMail}` :
                      JSON.parse(emp.Photo).serverUrl + JSON.parse(emp.Photo).serverRelativeUrl}>
                  </EmployeeWidget>
                </div>
              )
              )
            }
          </div>
        </div>
      </section>
    );
  }
}
