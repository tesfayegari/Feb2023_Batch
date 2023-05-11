import * as React from 'react';
import styles from './NewEmployees.module.scss';
import { INewEmployeesProps } from './INewEmployeesProps';
import { EmployeeWidget } from './EmployeeWidget';
import { SPService } from '../Services/SPService';

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
    this.service.readEmployeesItems('NewEmployees', 4)
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

  public render(): React.ReactElement<INewEmployeesProps> {
    return (
      <section className={`${styles.newEmployees} ${this.props.hasTeamsContext ? styles.teams : ''}`}>
        <div className="p-2 jumbotron">
          <h1>{this.props.description}</h1>
        </div>
        <div className="container-fluid">
          {/* <h3>{this.state.myNumber}</h3>
          <button className="btn btn-primary m-1" onClick={() => this.increaseNum()}>+</button>
          <button className="btn btn-primary m-1" onClick={() => this.decreaseNum()}>-</button> */}
          <div className="row">
            {
              this.state.employees.map(emp => (
                <div className="col-md">
                  <EmployeeWidget
                    name={emp.Employee.Title}
                    email={emp.Employee.Email}
                    bio={emp.Biography}>
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
