import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  Directive,
} from '@angular/core';
import { Ajax, createElement } from '@syncfusion/ej2-base';
import { scheduleData } from './data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {
  ListBoxAllModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  FieldSettingsModel,
  ToolbarSettingsModel,
} from '@syncfusion/ej2-dropdowns';
// import { WbsData } from './data'; // Import the data
import { WbsService } from './wbs.service';
import { ElementRef } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import {
  SwitchComponent,
  rippleMouseHandler,
} from '@syncfusion/ej2-angular-buttons';
import { NgModel } from '@angular/forms';

import {
  DataManager,
  Query,
  ODataV4Adaptor,
  Predicate,
  ReturnOption,
} from '@syncfusion/ej2-data';
import {
  ItemModel,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';
import {
  extend,
  closest,
  remove,
  addClass,
  isNullOrUndefined,
  L10n,
} from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  View,
  PopupOpenEventArgs,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  ResizeService,
  WorkHoursModel,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
  ActionEventArgs,
  CellClickEventArgs,
  EventRenderedArgs,
  EJ2Instance,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  ExcelExportService,
} from '@syncfusion/ej2-angular-schedule';
import {
  DragAndDropEventArgs,
  NodeExpandEventArgs,
} from '@syncfusion/ej2-navigations';
import { DatePicker } from '@syncfusion/ej2-calendars';
import {
  FormValidator,
  TextBox,
  FormValidatorModel,
} from '@syncfusion/ej2-angular-inputs';

import {
  Grid,
  SortService,
  ColumnMenuService,
  FilterService,
  GroupService,
  PageService,
} from '@syncfusion/ej2-angular-grids';

class temp extends ODataV4Adaptor {
  override update(
    dm: DataManager,
    keyField: string,
    value: Object,
    tableName?: string,
    query?: Query,
    original?: Object
  ): Object {
    return {};
  }
}

L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Save',
      cancelButton: 'Close',
      deleteButton: 'Remove',
      newEvent: 'Add Event',
      editEvent: 'Update Information',
    },
  },
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    TimelineViewsService,
    TimelineMonthService,
    ResizeService,
    DragAndDropService,
    SortService,
    ResizeService,
    GroupService,
    ColumnMenuService,
    PageService,
    FilterService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
    ExcelExportService,
  ],
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  @ViewChild('treeObj') public treeObj!: TreeViewComponent;
  @ViewChild('maskObj') maskObj!: MaskedTextBoxComponent;
  public title = 'PTTEP Operation Plan Management';
  public isTreeItemDropped = false;
  public draggedItemId = '';
  public showQuickInfo: Boolean = true;
  @ViewChild('formElement') element: any;
  public rowAutoHeight: boolean = false;
  public currentView: View = 'TimelineMonth';
  public filterSettings = { type: 'CheckBox' };
  public showSearchResult: boolean = false;
  public rigNameList = [
    ...new Set(scheduleData.map((item: { [x: string]: any; }) => item['RigName'])),
  ];
  public assetList = [...new Set(scheduleData.map((item: { [x: string]: any; }) => item['Asset']))];
  public funnelList = [
    ...new Set(scheduleData.map((item: { [x: string]: any; }) => item['FunnelName'])),
  ];
  public projectTypeList = [
    ...new Set(scheduleData.map((item: { [x: string]: any; }) => item['ProjectType'])),
  ];
  public wellTypeList = [
    ...new Set(scheduleData.map((item: { [x: string]: any; }) => item['WellType'])),
  ];
  public contractList = [
    ...new Set(scheduleData.map((item: { [x: string]: any; }) => item['Contract'])),
  ];
  public depthList = [...new Set(scheduleData.map((item: { [x: string]: any; }) => item['Depth']))];

  public formattedDate: any;
  public SCHEDUSELECTED: any;
  public BLANKPROJECTCREATE = [];
  public BLANKPROJECTUPDATE = [];
  public BLANKPROJECTREMOVE = [];
  public SCHEDUCHANGE = [];
  private scenarioId = 1056;
  @ViewChild('checkedSwitch', { static: true })
  switchComponent!: SwitchComponent;

  public data: Record<string, any>[] = extend(
    [],
    [scheduleData],
    {},
    true
  ) as Record<string, any>[];

  public selectedDate: Date = new Date(2023, 1, 1);
  public monthInterval: number = 60;
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };

  public rigDataSource: Record<string, any>[] = [
    {
      Text: 'Operation Unit - RigA',
      Id: 104,
      GroupId: 104,
      Color: '#bbdc00',
    },
    {
      Text: 'Operation Unit - RigB',
      Id: 105,
      GroupId: 105,
      Color: '#9e5fff',
    },
    {
      Text: 'Operation Unit - RigC',
      Id: 106,
      GroupId: 106,
      Color: '#6495ED',
    },
    {
      Text: 'Operation Unit - RigD',
      Id: 108,
      GroupId: 108,
      Color: '#2ECC71',
    },
    {
      Text: 'Operation Unit - RigE',
      Id: 109,
      GroupId: 109,
      Color: '#E67E22',
    },
    {
      Text: 'Operation Unit - RigF',
      Id: 110,
      GroupId: 110,
      Color: '#FF7F50',
    },
    {
      Text: 'Operation Unit - RigG',
      Id: 111,
      GroupId: 111,
      Color: '#FF7F50',
    },
  ];

  public funnelColorCodes: Record<string, any>[] = [
    {
      Text: 'CPP1',
      Id: 1,
      Color: '#bbdc00',
    },
    {
      Text: 'CPP2',
      Id: 2,
      Color: '#9e5fff',
    },
    {
      Text: 'CPP3',
      Id: 3,
      Color: '#6495ED',
    },
    {
      Text: 'CPP4',
      Id: 4,
      Color: '#2ECC71',
    },
    {
      Text: 'CPP5',
      Id: 5,
      Color: '#E67E22',
    },
    {
      Text: 'CPP6',
      Id: 6,
      Color: '#CCCCFF',
    },
    {
      Text: 'CPP7',
      Id: 8,
      Color: '#F39C12',
    },
    {
      Text: 'CPP8',
      Id: 7,
      Color: '#8E44AD',
    },
    {
      Text: 'CPP9',
      Id: 8,
      Color: '#3498DB',
    },
    {
      Text: 'GAS II',
      Id: 11,
      Color: '#FF7F50',
    },
  ];

  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Rigs'],
  };

  public allowMultiple = false;
  public eventSettings!: EventSettingsModel;
  nextElementSibling: any;
  scheduleCreated() {
    this.scheduleObj.eventSettings = {
      dataSource: extend([], scheduleData, {}, true) as Record<string, any>[],
      fields: {
        subject: { title: 'Project Name', name: 'Name' },
        startTime: { title: 'Start Date', name: 'StartTime' },
        endTime: { title: 'End Date', name: 'EndTime' },
      },
      enableTooltip: true,
      ignoreWhitespace: true,
    };

    this.SCHEDUSELECTED?.forEach(
      (element: {
        NoOfWell: any;
        IsDone: boolean;
        StartTime: string | number | Date;
        EndTime: string | number | Date;
      }) => {
        if (element.NoOfWell) {
          element.IsDone =
            new Date(element.StartTime) < new Date() ? true : false;
        } else {
          element.IsDone =
            new Date(element.EndTime) < new Date() ? true : false;
        }
      }
    );
  }

  public allowDragAndDrop = true;

  reload() {
    this.scheduleObj.eventSettings = {
      dataSource: extend([], this.SCHEDUSELECTED, {}, true) as Record<
        string,
        any
      >[],
      fields: {
        subject: { title: 'Name', name: 'Name' },
        startTime: { title: 'Start Date', name: 'StartTime' },
        endTime: { title: 'End Date', name: 'EndTime' },
      },
      enableTooltip: true,
    };
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log('onPopupOpen', args);

    let isEmptyCell =
      args.target?.classList.contains('e-work-cells') ||
      args.target?.classList.contains('e-header-cells'); // checking whether the cell is empty or not
    let ProjectIdElement: HTMLInputElement = args.element.querySelector(
      '#Id'
    ) as HTMLInputElement;

    let ProjectName: HTMLInputElement = args.element.querySelector(
      '#Name'
    ) as HTMLInputElement;

    this.projectIdentifier = ProjectName.value;
    this.matchKeywords();

    if (args.type === 'QuickInfo' && isEmptyCell) {
      let endElement: HTMLInputElement = args.element.querySelector(
        '#EndTime'
      ) as HTMLInputElement;
      endElement.readOnly = false;
      endElement.disabled = true;
      console.log('if executed QuickInfo');
    } else if (args.type === 'Editor' && isEmptyCell) {
      console.log('for Bank Project Editor');
      let nameElement: HTMLInputElement = args.element.querySelector(
        '#Name'
      ) as HTMLInputElement;
      nameElement.readOnly = false;
      nameElement.disabled = false;
      //nameElement.value = "BK" + ProjectIdElement.value
    }

    if (args.type === 'Editor') {
      let valueIndex = this.rigDataSource.findIndex(
        (index) => index['Id'] === args.data?.['RigId']
      );
      let rigName = this.rigDataSource[valueIndex]['Text'];
      (args.element.querySelector('#RigName') as HTMLInputElement).value =
        rigName;

      let DropdownElement: HTMLInputElement = args.element.querySelector(
        '#RigId'
      ) as HTMLInputElement;

      // if (!DropdownElement.classList.contains('e-dropdownlist')) {
      //   let dropdown: DropDownList = new DropDownList({
      //     fields: { text: 'Id', value: 'Id' },
      //     dataSource: this.rigDataSource,
      //     value: args.data.RigId ? args.data.RigId : [args.data.RigId],
      //   });
      //   dropdown.appendTo(DropdownElement);
      // }

      let NoOfWellElement: HTMLInputElement = args.element.querySelector(
        '#NoOfWell'
      ) as HTMLInputElement;

      if (args.element?.querySelector('#NoOfWell')) {
        let hiddenSection = true;

        if (NoOfWellElement.value === '') {
          // for blank project implementation
        } else {
          // console.log('Not Blank Project!');
          // let blankProjectDurationRow: HTMLInputElement =
          //   args.element.querySelector(
          //     '#blankProjectDurationRow'
          //   ) as HTMLInputElement;
          // blankProjectDurationRow.hidden = true;

          let endElement: HTMLInputElement = args.element.querySelector(
            '#EndTime'
          ) as HTMLInputElement;
          endElement.readOnly = true;
          endElement.disabled = true;

          let nameElement: HTMLInputElement = args.element.querySelector(
            '#Name'
          ) as HTMLInputElement;
          nameElement.readOnly = false;
          nameElement.disabled = false;

          if (!endElement.classList.contains('e-datepicker')) {
            new DatePicker(
              { value: new Date(endElement.value) || new Date() },
              endElement
            );
          }
        }
      } else {
        console.log('Not Editor Mode.');
        let endElement: HTMLInputElement = args.element.querySelector(
          '#EndTime'
        ) as HTMLInputElement;
        endElement.readOnly = true;
        endElement.disabled = true;

        if (!endElement.classList.contains('e-datepicker')) {
          new DatePicker(
            { value: new Date(endElement.value) || new Date() },
            endElement
          );
        }
      }

      let startElement: HTMLInputElement = args.element.querySelector(
        '#StartTime'
      ) as HTMLInputElement;
      if (!startElement.classList.contains('e-datepicker')) {
        new DatePicker(
          { value: new Date(startElement.value) || new Date() },
          startElement
        );
      }
      startElement.readOnly = true;
      startElement.disabled = true;

      // let onlineDateElement: HTMLInputElement = args.element.querySelector(
      //   '#OnlineDate'
      // ) as HTMLInputElement;

      // onlineDateElement.readOnly = false;
      // onlineDateElement.disabled = true;

      // if (!onlineDateElement.classList.contains('e-datepicker')) {
      //   new DatePicker(
      //     { value: new Date(onlineDateElement.value) || new Date() },
      //     onlineDateElement
      //   );
      // }

      let nameElement: HTMLInputElement = args.element.querySelector(
        '#Name'
      ) as HTMLInputElement;
      nameElement.addEventListener('change', (event) => {
        let nameValue = (event.target as HTMLInputElement).value;

        if (nameValue == '') {
          nameElement.classList.add('.e-error');
          nameElement.style.color = '#D8000C';
          nameElement.style.backgroundColor = '#FFBABA';
          // (args.element.querySelector('.name-validation')).innerHTML = 'Error: project name is required';
          // (args.element.querySelector('.name-validation')).style.color = '#D8000C';
        } else {
          //console.log("nameValue : " + nameValue)
          let isDuplicate = this.isDuplicateEntryName(nameValue);
          //console.log("isDuplicate : " + isDuplicate)
          if (isDuplicate) {
            nameElement.classList.add('.e-error');
            nameElement.style.color = '#D8000C';
            nameElement.style.backgroundColor = '#FFBABA';
            // (args.element.querySelector('.name-validation')).innerHTML =
            //   'Error: This project name already exists! Please choose a different name!';
            // (args.element.querySelector('.name-validation')).style.color = '#D8000C';
          } else {
            nameElement.classList.remove('.e-error');
            nameElement.style.color = '#4F8A10';
            nameElement.style.backgroundColor = '#DFF2BF';
            nameElement.classList.add('.success');
            // (args.element.querySelector('.name-validation')).innerHTML = 'Ok, this name is not duplicated.';
            // (args.element.querySelector('.name-validation')).style.color = '#4F8A10';
          }
        }
      });
    }
  }

  isDuplicateEntryName(name: string): boolean {
    let entries = this.scheduleObj.getCurrentViewEvents() as { Name: string }[];
    return entries.some(
      (entry) => entry.Name.toLowerCase() === name.toLowerCase()
    );
  }

  onPopupClose(args: { type: string; data: { EndTime: string } }) {
    if (args.type === 'Editor' && args.data && args.data.EndTime) {
      if (this.formattedDate && !Number.isNaN(this.formattedDate)) {
        args.data.EndTime = this.formattedDate;
      } else {
        console.log(
          ' isNaN onPopupClose args.data.EndTime : ' + args.data.EndTime
        );
      }
      this.formattedDate = NaN;
    }
  }

  public getRigName(value: ResourceDetails): string {
    const textField = (value as ResourceDetails).resource.textField;

    if (textField !== undefined) {
      const fieldValue = value.resourceData[textField];

      if (fieldValue !== undefined) {
        return fieldValue as string;
      } else {
        // Handle the case where the field value is undefined
        return 'DefaultRigName'; // Replace 'DefaultRigName' with a suitable default value
      }
    } else {
      // Handle the case where textField is undefined
      return 'DefaultRigName'; // Replace 'DefaultRigName' with a suitable default value
    }
  }

  public onItemDragStop(event: any): void {
    // To prevent default drag save action. Since we saving the appointment using saveEvent method
    //event.cancel = true;

    //to find the overlapped events on dropping the event.
    let overlapEvent = this.scheduleObj.eventBase
      .filterEvents(event.data.StartTime, event.data.EndTime)
      .filter(
        (x) => x['RigId'] == event.data.RigId && x['Id'] != event.data.Id
      )[0];
    // get the events to be reschedule due to overlap
    let eventsToBeReschedule = this.scheduleObj
      .getEvents(event.data.StartTime)
      .filter((x) => x['RigId'] == event.data.RigId);

    // To prevent script error if there is no overlapEvent
    let overlapEventIndex = overlapEvent
      ? eventsToBeReschedule.findIndex((x) => x['Id'] == overlapEvent['Id'])
      : -1;
    if (overlapEventIndex != -1) {
      eventsToBeReschedule.splice(overlapEventIndex, 1);
    }
    // In the appointment smaller id vlaue not present. So, changed to Id.
    let dropEventIndex = eventsToBeReschedule.findIndex(
      (x) => x['Id'] == event.data.Id
    );
    if (dropEventIndex != -1) {
      eventsToBeReschedule.splice(dropEventIndex, 1);
    }

    let startTime = isNullOrUndefined(overlapEvent)
      ? event.data.EndTime
      : overlapEvent['EndTime'];
    // if (!isNullOrUndefined(overlapEvent)) {
    //startTime = overlapEvent.EndTime;
    let timeDiff = event.data.EndTime - event.data.StartTime;
    // Since the requirement is the resched appointment needs be start from where the overlap event ends. No need to add one day
    event.data.StartTime = new Date(startTime.getTime());
    event.data.EndTime = new Date(event.data.StartTime.getTime() + timeDiff);
    // Since we didn't make any changes in the overlapEvent. Save the dropped event using saveEvent
    this.scheduleObj.saveEvent(event.data, 'Save');
    startTime = event.data.EndTime;
    for (let i = 0; i < eventsToBeReschedule.length; i++) {
      let timeDiff =
        eventsToBeReschedule[i]['EndTime'] -
        eventsToBeReschedule[i]['StartTime'];
      // Since the requirement is the resched appointment needs be start from where the overlap event ends. No need to add one day
      // Since the requirement is the resched appointment needs be start from where the overlap event ends. No need to add one day
      eventsToBeReschedule[i]['StartTime'] = new Date(startTime.getTime());
      eventsToBeReschedule[i]['EndTime'] = new Date(
        eventsToBeReschedule[i]['StartTime'].getTime() + timeDiff
      );
      startTime = eventsToBeReschedule[i]['EndTime'];
    }
    this.scheduleObj.saveEvent(eventsToBeReschedule, 'Save');
    // }
  }

  public onItemDrag(event: any): void {
    // if (this.scheduleObj.isAdaptive) {
    //   if (this.scheduleObj.element.querySelector('.e-device-hover')) {
    //     (this.scheduleObj.element.querySelector('.e-device-hover')).classList.remove('e-device-hover');
    //   }
    //   if (event.event.target.classList.contains('e-work-cells')) {
    //     addClass([event.event.target], 'e-device-hover');
    //   }
    // }
    // if (document.body.style.cursor === 'not-allowed') {
    //   document.body.style.cursor = '';
    // }
    // if (event.name === 'nodeDragging') {
    //   const dragElementIcon: NodeListOf<HTMLElement> =
    //     document.querySelectorAll(
    //       '.e-drag-item.treeview-external-drag .e-icon-expandable'
    //     );
    //   for (const icon of [].slice.call(dragElementIcon)) {
    //     icon.style.display = 'none';
    //   }
    // }
  }

  onDatabound(args: any) {
    // let currentDateTd: HTMLElement = this.scheduleObj.element.querySelector('.e-current-date');
    // let indicator: HTMLElement = this.scheduleObj.element.querySelector(
    //   '.e-current-day-indicator'
    // );
    // if (currentDateTd && !indicator) {
    //   indicator = this.scheduleObj.createElement('div', {
    //     className: 'e-current-day-indicator',
    //   });
    //   currentDateTd.appendChild(indicator);
    // }
  }

  public onExportClick(): void {
    this.scheduleObj.exportToExcel({
      fields: [
        'Id',
        'RigId',
        'RigName',
        'Asset',
        'FunnelName',
        'ProjectType',
        'WellType',
        'Depth',
        'ProjectStartDate',
        // 'PAForSlotRecoveryStartDate',
        // 'DrillingStartDate',
        'StartTime',
        'EndTime',
        'Name',
      ],
      fieldsInfo: [
        { name: 'Id', text: 'ProjectId' },
        { name: 'RigId', text: 'RigId' },
        { name: 'RigName', text: 'RigName' },
        { name: 'Name', text: 'Project Name' },
        { name: 'Asset', text: 'Asset Name' },
        { name: 'FunnelName', text: 'Funnel Name' },
        { name: 'ProjectType', text: 'Project Type' },
        { name: 'WellType', text: 'Well Type' },
        { name: 'Depth', text: 'Depth' },
        { name: 'StartTime', text: 'StartTime' },
        { name: 'EndTime', text: 'EndTime' },
      ],
    });
  }

  public onActionBegin(event: ActionEventArgs): void {
    if (event.requestType === 'eventChange') {
      (event.data as any).Id = parseInt((event.data as any).Id);
    }

    if (event.requestType === 'eventRemove') {
      let id: any
      if (event.deletedRecords) {
        id = event.deletedRecords[0]['Id']
      }
      let incex4changethis = this.SCHEDUSELECTED.findIndex(
        (x: { Id: any; }) => x.Id == id
      );
      this.SCHEDUSELECTED[incex4changethis].RigName = 'Generic';
      this.SCHEDUSELECTED[incex4changethis].RigId = 0;
      let dpi: any
      if (event.deletedRecords) {
        dpi = event.deletedRecords[0]['DPI']
      }
      // if (!dpi) {
      //   this.SCHEDUSELECTED[incex4changethis].ProjectID =
      //     this.SCHEDUSELECTED[incex4changethis].Id;
      //   this.BLANKPROJECTREMOVE.push(this.SCHEDUSELECTED[incex4changethis]);
      // } else {
      //   this.SCHEDUCHANGE.push(this.SCHEDUSELECTED[incex4changethis]);
      // }
      this.reload();
      // this.Changetime(event.deletedRecords[0])
    }

    if (event.requestType === 'eventCreate' && !this.isTreeItemDropped) {
    //   //For creating blank project -- WCLD
    //   let idValue = event.data[0].Id;
    //   let nameValue = event.data[0].Name;
    //   let combinedValue = `BK-${idValue}-${nameValue}`;
    //   //event.data[0].Name = combinedValue;
    //   let isDuplicate = this.isDuplicateEntryName(nameValue);

    //   if (isDuplicate) {
    //     //'This name already exists. Please choose a different name.';
    //     console.log(
    //       'This name already exists. Please choose a different name.'
    //     );
    //     event.cancel = true;
    //   }
    // }

    // if (event.requestType === 'toolbarItemRendering') {
    //   const exportItem: ItemModel = {
    //     align: 'Right',
    //     showTextOn: 'Both',
    //     prefixIcon: 'e-icon-schedule-excel-export',
    //     text: 'Excel Export',
    //     cssClass: 'e-excel-export',
    //     click: this.onExportClick.bind(this),
    //   };

    //   event.items.push(exportItem);
    }
    if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
      const treeViewData: Record<string, any>[] = this.treeObj.fields
        .dataSource as Record<string, any>[];
      const filteredPeople: Record<string, any>[] = treeViewData.filter(
        (item: any) => item.Id !== parseInt(this.draggedItemId, 10)
      );

      this.treeObj.fields.dataSource = filteredPeople;
      console.log(
        'NEW this.treeObj.fields.dataSource',
        this.treeObj.fields.dataSource
      );
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
        '.e-drag-item.treeview-external-drag'
      );
      for (const element of [].slice.call(elements)) {
        remove(element);
      }
    }
  }

  public actionComplete({ args }: { args: ActionEventArgs }): void {
    console.log('actionComplete', args);
    // console.log('Event Created.', args.addedRecords[0]);
  }

  public onEventRendered(args: EventRenderedArgs): void {
    //const categoryColor: string = args.data.CategoryColor as string;
    //console.log('x.Id:', x.Id);
    if (this.funnelColorCodes) {
      let Index2 = this.funnelColorCodes.findIndex(
        (index) => index['Text'] === args.data['FunnelName']
      );

      // console.log('*****Index2 : ', Index2);

      if (Index2 !== -1) {
        let funnelColor = this.funnelColorCodes[Index2]['Color'];

        // console.log('funnelColor:', funnelColor);

        args.element.style.backgroundColor = funnelColor;
        // args.element.style.outline = '2px solid ' + funnelColor + ' ';
        args.element.style.height = '70px';
        args.element.style.fontSize = '14px';
        args.element.style.color = '#000000';
        //args.element.style.border = 'unset';
      } else {
        console.log('FunnelName not found in funnelColorCodes.');
      }
    } else {
      console.log('funnelColorCodes is undefined.');
    }
  }

  async onSaveClick() {
    // console.log('SCHEDUCHANGE', this.SCHEDUSELECTED);
    // console.log('BLANKPROJECTCREATE', this.BLANKPROJECTCREATE);
    // console.log('BLANKPROJECTREMOVE', this.BLANKPROJECTREMOVE);
    // this.SCHEDUSELECTED.forEach((elementupdate) => {
    //   //Set Formate Date
    //   elementupdate.StartTime = elementupdate.StartTime.toLocaleString();
    //   elementupdate.EndTime = elementupdate.EndTime.toLocaleString();
    //   if (!elementupdate.DPI) {
    //     // this.BLANKPROJECTREMOVE.forEach(elementremove => {
    //     //   if(elementremove.Id != elementupdate.Id)
    //     //   {
    //     elementupdate.ProjectName = elementupdate.ProjectName;
    //     elementupdate.ProjectID = elementupdate.Id;
    //     elementupdate.DrillingEndDate = elementupdate.EndTime;
    //     elementupdate.ProjectStartDate = elementupdate.StartTime;
    //     this.BLANKPROJECTUPDATE.push(elementupdate);
    //     //   }
    //     // });
    //   }
    // });
    // if (this.SCHEDUSELECTED.length > 0) {
    //   console.log('SCHEDUCHANGE', this.SCHEDUSELECTED);
    //   var jsonStringSCHEDUSELECTED = JSON.stringify(this.SCHEDUSELECTED);
    //   console.log('jsonStringSCHEDUCHANGE', jsonStringSCHEDUSELECTED);
    //   const ajax = new Ajax(
    //     'http://localhost:7071/api/scenario/SaveSchedProjectConst',
    //     'POST'
    //   );
    //   await ajax.send(jsonStringSCHEDUSELECTED);
    //   ajax.onSuccess = (data: string) => {};
    // }
    // if (this.BLANKPROJECTREMOVE.length > 0) {
    //   console.log('BLANKPROJECTREMOVE', this.BLANKPROJECTREMOVE);
    //   var jsonStringBLANKPROJECTREMOVE = JSON.stringify(
    //     this.BLANKPROJECTREMOVE
    //   );
    //   const ajax = new Ajax(
    //     'http://localhost:7071/api/scenario/RemoveBlankProject',
    //     'POST'
    //   );
    //   await ajax.send(jsonStringBLANKPROJECTREMOVE);
    //   ajax.onSuccess = (data: string) => {};
    // }
    // if (this.BLANKPROJECTUPDATE.length > 0) {
    //   console.log('BLANKPROJECTUPDATE', this.BLANKPROJECTUPDATE);
    //   var jsonStringBLANKPROJECTUPDATE = JSON.stringify(
    //     this.BLANKPROJECTUPDATE
    //   );
    //   console.log('jsonStringBLANKPROJECTUPDATE', jsonStringBLANKPROJECTUPDATE);
    //   const ajax = new Ajax(
    //     'http://localhost:7071/api/scenario/SaveBlankProject',
    //     'POST'
    //   );
    //   await ajax.send(jsonStringBLANKPROJECTUPDATE);
    //   ajax.onSuccess = (data: string) => {};
    // }
    // this.BLANKPROJECTCREATE = [];
    // this.BLANKPROJECTUPDATE = [];
    // this.BLANKPROJECTREMOVE = [];
    // this.SCHEDUCHANGE = [];
  }

  async remove() {
    // if (this.SCHEDUCHANGE.length > 0) {
    //   console.log('removeSCHEDUCHANGE', this.SCHEDUCHANGE);
    //   var jsonString = JSON.stringify(this.SCHEDUCHANGE[0]);
    //   const ajax = new Ajax(
    //     'http://localhost:7071/api/scenario/RemoveSchedProjectConst',
    //     'POST'
    //   );
    //   await ajax.send(jsonString);
    //   ajax.onSuccess = (data: string) => {};
    //   //this.treeCreated();
    // }
  }

  Changetime(data: any) {
    //BEWY_08A
    if (data == null) {
      return;
    } else {
      console.log('eventRemove', data);

      const datestart = new Date(data.StartTime);
      const dateend = new Date(data.EndTime);
      const durationMs = dateend.getTime() - datestart.getTime();
      const NAME = data.RigName;
      // const [yearstart,monthstart, daystart ] = strdatestart.split('-');
      // const [yearend,monthend, dayend ] = strdateend.split('-');

      const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24)) + 1;

      this.SCHEDUSELECTED.forEach(
        (element: {
          RigName: any;
          StartTime: string;
          EndTime: any;
          DrillingEndDate: string;
        }) => {
          if (NAME === element.RigName) {
            const strdatestart = element.StartTime;
            const strdateend = element.EndTime;

            const [yearstart, monthstart, daystart] = strdatestart.split('-');
            const [yearend, monthend, dayend] = strdateend.split('-');

            const startdate4cal = new Date(
              yearstart + '-' + monthstart + '-' + daystart
            );
            const enddate4cal = new Date(
              yearend + '-' + monthend + '-' + dayend
            );
            if (startdate4cal > dateend) {
              startdate4cal.setDate(startdate4cal.getDate() - durationDays);
              enddate4cal.setDate(enddate4cal.getDate() - durationDays);

              // Convert the duration to days

              console.log(
                yearstart + monthstart + daystart,
                'newstart',
                new Date(yearstart + '-' + monthstart + '-' + daystart)
              );
              console.log(
                yearend + monthend + dayend,
                'newend',
                new Date(yearend + '-' + monthend + '-' + dayend)
              );
              const datestart =
                yearstart +
                '-' +
                ('0' + (Number(monthstart) + 1)).slice(-2) +
                '-' +
                daystart;
              const dateend =
                yearend +
                '-' +
                ('0' + (Number(monthend) + 1)).slice(-2) +
                '-' +
                dayend;

              //console.log('datechange',startdate4cal.toLocaleString(),enddate4cal)
              element.StartTime = `${startdate4cal.getFullYear()}-${(
                '0' +
                (Number(startdate4cal.getMonth()) + 1)
              ).slice(-2)}-${(
                '0' +
                (Number(startdate4cal.getDate()) + 1)
              ).slice(-2)}T00:00:00`;
              element.DrillingEndDate = `${enddate4cal.getFullYear()}-${(
                '0' +
                (Number(enddate4cal.getMonth()) + 1)
              ).slice(-2)}-${('0' + (Number(enddate4cal.getDate()) + 1)).slice(
                -2
              )}T00:00:00`;
              //console.log('1',element)
            }
          }
        }
      );
      //remove temp datatest

      const deleteindex = this.SCHEDUSELECTED.findIndex(
        (x: { Name: any }) => x.Name == data.Name
      );
      this.SCHEDUSELECTED.splice(deleteindex, 1);

      //Set new data
      this.scheduleObj.eventSettings = {
        dataSource: extend([], this.SCHEDUSELECTED, {}, true) as Record<
          string,
          any
        >[],
        fields: {
          subject: { title: 'Name', name: 'Name' },
          startTime: { title: 'Start Date', name: 'StartTime' },
          endTime: { title: 'Finish Date', name: 'EndTime' },
        },
        enableTooltip: true,
      };
    }
  }

  public dataA: { [key: string]: Object }[] = [
    { Name: 'PH-14 Drilling (Well: Drill', Code: 'C-EUl.D.D1.19120.01.422' },
    {
      Name: 'PH-14 Drilling (Well: Data Acquisition',
      Code: 'C-EUl.D.D1.19120.01.423',
    },
    { Name: 'PH-14 Drilling (Well: Testing', Code: 'C-EUl.D.D1.19120.01.424' },
    {
      Name: 'PH-14 Drilling (Well: Drilling Well Alla',
      Code: 'C-EUl.D.D1.19120.01.428',
    },
    {
      Name: 'PH-14 Drilling (Well: Plug & Abandon',
      Code: 'C-EUl.D.D1.19120.01.429',
    },
    { Name: 'PH-15 Well Completion (Wellpad-D)', Code: 'C-EUl.D.D1.19120.02' },
    { Name: 'PH-15 Well Completio: Move', Code: 'C-EUl.D.D1.19120.02.431' },
    {
      Name: 'PH-15 Well Completio: Completion (incl.',
      Code: 'C-EUl.D.D1.19120.02.432',
    },
    {
      Name: 'PH-15 Well Completio: Intervent ion (logg',
      Code: 'C-EUl.D.D1.19120.02.433',
    },
    {
      Name: 'PH-15 Well Completio: Stimulation (Acidi',
      Code: 'C-EUl.D.D1.19120.02.434',
    },
    {
      Name: 'TRWI-19 Well Completion (Wellpad-D)',
      Code: 'D-EMl.D.D1.19120.02',
    },
    { Name: 'TRWI-19 Well Completio: Move', Code: 'D-EMl.D.D1.17125.01.410' },
    {
      Name: 'TRWI-19 Well Completio: Completion (incl.',
      Code: 'D-EMl.D.D1.17125.01.411',
    },
    {
      Name: 'TRWI-19 Well Completio: Intervent ion (logg',
      Code: 'D-EMl.D.D1.17125.01.412',
    },
    {
      Name: 'TRWI-19 Well Completio: Stimulation (Acidi',
      Code: 'D-EMl.D.D1.17125.01.413',
    },
    {
      Name: 'TRWI-19 Well Completio: Testing',
      Code: 'D-EMl.D.D1.17125.01.414',
    },
    {
      Name: 'TRWI-19 Well Completio: Complet ion Allocat',
      Code: 'D-EMl.D.D1.17125.01.415',
    },
    { Name: 'SAWF-21 Drilling (Wellpad-D)', Code: 'E-EYl.D.D1.18220.01' },
    { Name: 'SAWF-21 Drilling (Well: Move', Code: 'E-EYl.D.D1.18220.01.421' },
    {
      Name: 'SAWF-21 Drilling (Well: Drilling Well Alla',
      Code: 'E-EYl.D.D1.18220.01.428',
    },
    {
      Name: 'SAWF-21 Drilling (Well: Plug & Abandon',
      Code: 'E-EYl.D.D1.18220.01.429',
    },
    {
      Name: 'SAWF-22 Well Completion (Wellpad-D)',
      Code: 'E-EYl.D.D1.18220.02',
    },
    { Name: 'SAWF-22 Well Completio: Move', Code: 'E-EYl.D.D1.18220.02.410' },
    {
      Name: 'SAWF-22 Well Completio: Intervent ion (logg',
      Code: 'E-EYl.D.D1.18220.02.412',
    },
    {
      Name: 'SAWF-22 Well Completio: Stimulation (Acidi',
      Code: 'E-EYl.D.D1.18220.02.413',
    },
    { Name: 'ERWC-08 Drilling (Wellpad-D)', Code: 'F-EDl.D.D1.19120.01' },
    { Name: 'ERWC-08 Drilling (Well: Move', Code: 'F-EDl.D.D1.19120.01.421' },
    {
      Name: 'ERWC-08 Drilling (Well: Testing',
      Code: 'F-EDl.D.D1.19120.01.424',
    },
    {
      Name: 'YAWD-02 Well Completion (Wellpad-D)',
      Code: 'G-ECl.D.D1.19120.02',
    },
    { Name: 'YAWD-02 Well Completio: Move', Code: 'G-ECl.D.D1.17125.01.410' },
    {
      Name: 'YAWD-02 Well Completio: Stimulation (Acidi',
      Code: 'G-ECl.D.D1.17125.01.413',
    },
    {
      Name: 'YAWD-02 Well Completio: Testing',
      Code: 'G-ECl.D.D1.17125.01.414',
    },
  ];
  public dataB: { [key: string]: Object }[] = [];

  public fields: FieldSettingsModel = { text: 'Name' };
  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      'moveUp',
      'moveDown',
      'moveTo',
      'moveFrom',
      'moveAllTo',
      'moveAllFrom',
    ],
  };
  public noRecordsTemplate =
    '<div class= "e-list-nrt"><span>NO DATA AVAILABLE</span></div>';
  public projectIdentifier = '';

  public matchingEntries: { Name: string; Code: string }[] = [];
  public matchedSearchResult: any[] = [];
  public mathedTotalWellCount: number | null = null;

  constructor(private wbsService: WbsService) { }

  matchKeywords(): void {
    this.wbsService.getWbsEntries().subscribe(
      (entries) => {
        this.matchingEntries = this.filterMatchingEntries(entries);
        this.dataB = this.matchingEntries;
        this.dataA = entries.filter(
          (entry) =>
            !this.matchingEntries.some(
              (matchingEntry) => matchingEntry.Name === entry.Name
            )
        );
      },
      (error) => {
        console.error('Error fetching WBS entries', error);
      }
    );
  }

  filterMatchingEntries(
    entries: { Name: string; Code: string }[]
  ): { Name: string; Code: string }[] {
    // Implement logic to filter matching entries based on project identifier
    // For example, use regex or string matching based on the extracted keywords
    const keywords = this.extractKeywords(this.projectIdentifier);
    return entries.filter((entry) =>
      keywords.some(
        (keyword) =>
          entry.Name.includes(keyword) || entry.Code.includes(keyword)
      )
    );
  }

  extractKeywords(projectIdentifier: string): string[] {
    // Implement logic to extract keywords based on the project identifier format
    // For example, split the project identifier by ' ', '_', '-', or other separators
    return projectIdentifier.split(/[\s_\-]/);
  }

  //@ViewChild('scheduleObj') scheduleObj: ScheduleComponent;

  @ViewChild('taskName') taskNameObj!: ElementRef;
  @ViewChild('rigName') rigNameObj!: ElementRef;
  @ViewChild('asset') assetObj!: ElementRef;
  @ViewChild('funnelName') funnelNameObj!: ElementRef;
  @ViewChild('projectType') ProjectTypeObj!: ElementRef;
  @ViewChild('wellType') wellTypeObj!: ElementRef;
  @ViewChild('contract') contractObj!: ElementRef;
  @ViewChild('depth') depthObj!: ElementRef;
  @ViewChild('startTime') startTimeObj!: DatePickerComponent;
  @ViewChild('endTime') endTimeObj!: DatePickerComponent;

  public searchOnClick(): void {
    const searchObj: Record<string, any>[] = [];
    let endDate: Date;
    const formElements: HTMLInputElement[] = [
      this.taskNameObj.nativeElement,
      this.rigNameObj.nativeElement,
      this.assetObj.nativeElement,
      this.funnelNameObj.nativeElement,
      this.ProjectTypeObj.nativeElement,
      this.wellTypeObj.nativeElement,
      this.contractObj.nativeElement,
      this.depthObj.nativeElement,
    ];
    formElements.forEach((node: HTMLInputElement) => {
      if (node.value && node.value !== '') {
        searchObj.push({
          field: node.name,
          operator: 'contains',
          value: node.value,
          predicate: 'or',
          matchcase: 'true',
        });
      }
    });
    if (this.startTimeObj.value) {
      searchObj.push({
        field: 'StartTime',
        operator: 'greaterthanorequal',
        value: this.startTimeObj.value,
        predicate: 'and',
        matchcase: false,
      });
    }
    if (this.endTimeObj.value) {
      const date: Date = new Date(+this.endTimeObj.value);
      endDate = new Date(date.setDate(date.getDate() + 1));
      searchObj.push({
        field: 'EndTime',
        operator: 'lessthanorequal',
        value: endDate,
        predicate: 'and',
        matchcase: false,
      });
    }

    if (searchObj.length > 0) {
      const filter: Record<string, any> = searchObj[0];
      let predicate: Predicate = new Predicate(
        filter['field'],
        filter['operator'],
        filter['value'],
        filter['matchcase']
      );
      for (let i = 1; i < searchObj.length; i++) {
        predicate = predicate.and(
          searchObj[i]['field'],
          searchObj[i]['operator'],
          searchObj[i]['value'],
          searchObj[i]['matchcase']
        );
      }
      let endDate: Date | undefined;
      const eventDatas: Record<string, any>[] = this.scheduleObj.getEvents(
        this.startTimeObj.value,
        endDate,
        true
      );
      const result: Record<string, any>[] = new DataManager(
        eventDatas
      ).executeLocal(new Query().where(predicate));
      this.matchedSearchResult = result;
      // this.showSearchEvents('show', result);
    } else {
      // this.showSearchEvents('hide');
    }
    this.showSearchResult = true;
  }

  public clearOnClick(): void {
    const scheduleElement = document.getElementById('schedule');
    this.showSearchResult = false;
    if (scheduleElement) {
      scheduleElement.style.display = 'block';
    }
    (document.getElementById('form-search') as HTMLFormElement).reset();
    // this.showSearchEvents('hide');
    this.matchedSearchResult = [];
    this.mathedTotalWellCount = null;
  }

  public calWellNumOnClick() {
    if (this.matchedSearchResult.length > 0) {
      // access to each array and get sum of "NoOfWell" and assign to "mathedTotalWellCount"
      this.matchedSearchResult.forEach((element: { NoOfWell: number }) => {
        // this.mathedTotalWellCount += element.NoOfWell;
      });
    }
  }

  public switchValue: boolean = true;

  onSwitchChange(event: any): void {
    if (typeof event === 'boolean') {
      this.switchValue = event;
    } else if (event && typeof event.checked === 'boolean') {
      this.switchValue = event.checked;
    } else {
      console.error('Invalid switch event:', event);
      // Handle the invalid event case as needed
    }

    console.log('this.switchValue:', this.switchValue);
  }

  private showSearchEvents(type: string, data?: Record<string, any>): void {
    if (type === 'show' && this.switchValue) {
      const gridElement = document.getElementById('grid');

      if (gridElement && gridElement.classList.contains('e-grid')) {
        const gridObj: Grid = (
          gridElement.querySelector('#grid') as EJ2Instance
        ).ej2_instances[0] as Grid;
        if (data) {
          // Assuming gridObj.dataSource expects an array of objects (Object[])
          gridObj.dataSource = data as Object[];
          gridObj.dataBind();
        }
      } else {
        const gridObj: Grid = new Grid({
          dataSource: data,
          height: 505,
          width: 'auto',
          columns: [
            { field: 'RigName', headerText: 'Operating Unit', width: 50 },
            { field: 'Name', headerText: 'Name', width: 50 },
            { field: 'Asset', headerText: 'Asset', width: 50 },
            {
              field: 'StartTime',
              headerText: 'StartTime',
              width: 50,
              format: { type: 'dateTime', format: 'yyyy/M/d' },
            },
            {
              field: 'EndTime',
              headerText: 'EndTime',
              width: 50,
              format: { type: 'dateTime', format: 'yyyy/M/d' },
            },
          ],
        });
        gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
        this.scheduleObj.element.style.display = 'none';
      }
    } else {
      const gridObj: Record<string, any>[] = (
        document.querySelector('#grid') as EJ2Instance
      ).ej2_instances;

      if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
        (gridObj[0] as Grid).destroy();
      }
      this.scheduleObj.element.style.display = 'block';
    }
  }
  // private showSearchEvents(type: string, data?: Record<string, any>[]): void {

  //   // Assuming this.scheduleObj is your scheduler object

  //   if (type === 'show' && this.switchValue) {

  //     const gridElement = document.getElementById('grid');

  //     if (gridElement && gridElement.classList.contains('e-grid')) {
  //       const gridObj: Grid = (gridElement.querySelector('#grid') as EJ2Instance).ej2_instances[0] as Grid;
  //       if (data) {
  //         // Assuming gridObj.dataSource expects an array of objects (Object[])
  //         gridObj.dataSource = data as Object[];
  //         gridObj.dataBind();

  //         // Apply the search results to scheduleObj
  //         this.scheduleObj.eventSettings.dataSource = data;
  //         this.scheduleObj.dataBind();
  //       }
  //     } else {
  //       const gridObj: Grid = new Grid({
  //         dataSource: data,
  //         height: 505,
  //         width: 'auto',
  //         columns: [
  //           { field: 'RigName', headerText: 'Operating Unit', width: 50 },
  //           { field: 'Name', headerText: 'Name', width: 50 },
  //           { field: 'Asset', headerText: 'Asset', width: 50 },
  //           { field: 'StartTime', headerText: 'StartTime', width: 50, format: { type: 'dateTime', format: 'yyyy/M/d' } },
  //           { field: 'EndTime', headerText: 'EndTime', width: 50, format: { type: 'dateTime', format: 'yyyy/M/d' } },
  //         ]
  //       });
  //       gridObj.appendTo(document.querySelector('#grid') as HTMLElement);

  //       // Apply the search results to scheduleObj
  //       this.scheduleObj.eventSettings.dataSource = data;
  //       this.scheduleObj.dataBind();

  //       this.scheduleObj.element.style.display = 'none';
  //     }
  //   } else {
  //     const gridObj: Record<string, any>[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;

  //     if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
  //       (gridObj[0] as Grid).destroy();
  //     }

  //     // Show the scheduleObj
  //     this.scheduleObj.element.style.display = 'block';
  //   }

  // }

  @ViewChild('switch')
  public switch: SwitchComponent | undefined;
}
