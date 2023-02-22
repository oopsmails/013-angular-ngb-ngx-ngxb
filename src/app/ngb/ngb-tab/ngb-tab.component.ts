import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ngb-tab',
  templateUrl: './ngb-tab.component.html',
  styleUrls: ['./ngb-tab.component.scss'],
})
export class NgbTabComponent {
  tabs = [
    {
      title: 'Table 1',
      data: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          extn: '5421',
          start_date: '2011/04/25',
          salary: '$320,800',
        },
        {
          name: 'Garrett Winters',
          position: 'Accountant',
          office: 'Tokyo',
          extn: '8422',
          start_date: '2011/07/25',
          salary: '$170,750',
        },
        {
          name: 'Ashton Cox',
          position: 'Junior Technical Author',
          office: 'San Francisco',
          extn: '1562',
          start_date: '2009/01/12',
          salary: '$86,000',
        },
        {
          name: 'Cedric Kelly',
          position: 'Senior Javascript Developer',
          office: 'Edinburgh',
          extn: '6224',
          start_date: '2012/03/29',
          salary: '$433,060',
        },
      ],
      columns: [
        { name: 'Name', prop: 'name' },
        { name: 'Position', prop: 'position' },
        { name: 'Office', prop: 'office' },
        { name: 'Extn.', prop: 'extn' },
        { name: 'Start Date', prop: 'start_date' },
        { name: 'Salary', prop: 'salary' },
      ],
    },
    {
      title: 'Table 2',
      data: [
        {
          name: 'Airi Satou',
          position: 'Accountant',
          office: 'Tokyo',
          extn: '33',
          start_date: '2008/11/28',
          salary: '$162,700',
        },
        {
          name: 'Angelica Ramos',
          position: 'Chief Executive Officer (CEO)',
          office: 'London',
          extn: '5797',
          start_date: '2009/10/09',
          salary: '$1,200,000',
        },
        {
          name: 'Bradley Greer',
          position: 'Software Engineer',
          office: 'London',
          extn: '2558',
          start_date: '2012/10/13',
          salary: '$132,000',
        },
        {
          name: 'Brenden Wagner',
          position: 'Software Engineer',
          office: 'San Francisco',
          extn: '1314',
          start_date: '2011/06/07',
          salary: '$206,850',
        },
      ],
      columns: [
        { name: 'Name', prop: 'name' },
        { name: 'Position', prop: 'position' },
        { name: 'Office', prop: 'office' },
        { name: 'Extn.', prop: 'extn' },
        { name: 'Start Date', prop: 'start_date' },
        { name: 'Salary', prop: 'salary' },
      ],
    },
  ];
}
