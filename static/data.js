var INPUT_DATA = {
  api_version: '2.0',
  chart: {
    id: '1',
    name: 'Директор подразделения',
    description: '',
    parent_id: '',
    staff_department: 'N',
    manager_id: 'Иванков Игорь Валерьевич',
    dataFields: [{ name: 'Location', value: 'ввв', type: 'text' }],
    children: [
      {
        id: '2',
        name: 'Зам. по механизации',
        description: '',
        parent_id: '1',
        staff_department: 'N',
        manager_id: 'Гусаров Сергей Петрович',
        dataFields: [{ name: 'Location', value: '', type: 'text' }],
        showChildren: false,
        children: [{
          id: '5',
          name: 'Отдел механизации',
          description: '',
          parent_id: '2',
          staff_department: 'N',
          manager_id: 'Мария Николаевна Крылова',
          dataFields: [{ name: 'Location', value: '', type: 'text' }],
          showChildren: false,
          children: [
            {
              id: '6',
              name: '',
              description: '',
              parent_id: '5',
              staff_department: 'N',
              manager_id: 'Седова Анна Викторовна',
              dataFields: [{ name: 'Location', value: '', type: 'text' }],
              children: [],
              showChildren: false
            },
            {
              id: '7',
              name: '',
              description: '',
              parent_id: '5',
              staff_department: 'N',
              manager_id: 'Елена Викторовна Сидорова',
              dataFields: [{ name: 'Location', value: '', type: 'text' }],
              children: [],
              showChildren: false
            },
            {
              id: '8',
              name: '',
              description: '',
              parent_id: '5',
              staff_department: 'N',
              manager_id: 'Ольга Валерьевна Михайлова',
              dataFields: [{ name: 'Location', value: '', type: 'text' }],
              children: [],
              showChildren: false
            },
          ]
        }]
      },
      {
        id: '3',
        name: 'Главный инженер',
        description: '',
        parent_id: '1',
        staff_department: 'N',
        manager_id: 'Иван Алексеевич Павлов',
        dataFields: [{ name: 'Location', value: '', type: 'text' }],
        showChildren: false,
        children: [
          {
            id: '9',
            name: 'Охрана труда',
            description: '',
            parent_id: '3',
            staff_department: 'N',
            manager_id: 'Георгий Георгиевич Георгиев',
            dataFields: [{ name: 'Location', value: '', type: 'text' }],
            children: [
              {
                id: '11',
                name: '',
                description: '',
                parent_id: '3',
                staff_department: 'N',
                manager_id: 'Станислав Станиславович Станиславов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '12',
                name: '',
                description: '',
                parent_id: '3',
                staff_department: 'N',
                manager_id: 'Егор Егорович Егоров',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '13',
                name: '',
                description: '',
                parent_id: '3',
                staff_department: 'N',
                manager_id: 'Даниил Даниилович Даниилов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              }
            ],
            showChildren: false
          },
          {
            id: '10',
            name: 'Охрана труда',
            description: '',
            parent_id: '3',
            staff_department: 'N',
            manager_id: 'Фёдор Фёдорович Фёдоров',
            dataFields: [{ name: 'Location', value: '', type: 'text' }],
            children: [
              {
                id: '14',
                name: '',
                description: '',
                parent_id: '10',
                staff_department: 'N',
                manager_id: 'Борис Борисович Борисов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '15',
                name: '',
                description: '',
                parent_id: '10',
                staff_department: 'N',
                manager_id: 'Степан Степанович Степанов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '16',
                name: '',
                description: '',
                parent_id: '10',
                staff_department: 'N',
                manager_id: 'Сева Северович Северов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              }
            ],
            showChildren: false
          },
        ]
      },
      {
        id: '4',
        name: 'Зам. по кадрам',
        description: '',
        parent_id: '1',
        staff_department: 'N',
        manager_id: 'Алексей Романович Лебедев',
        dataFields: [{ name: 'Location', value: '', type: 'text' }],
        showChildren: false,
        children: [
          {
            id: '17',
            name: 'Охрана труда',
            description: '',
            parent_id: '4',
            staff_department: 'N',
            manager_id: 'Роман Романович Романов',
            dataFields: [{ name: 'Location', value: '', type: 'text' }],
            children: [
              {
                id: '18',
                name: '',
                description: '',
                parent_id: '17',
                staff_department: 'N',
                manager_id: 'Валентин Валентинович Валентинов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '18',
                name: '',
                description: '',
                parent_id: '17',
                staff_department: 'N',
                manager_id: 'Иван Иванович Иванов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              },
              {
                id: '18',
                name: '',
                description: '',
                parent_id: '17',
                staff_department: 'N',
                manager_id: 'Леонид Леонидович Леонидов',
                dataFields: [{ name: 'Location', value: '', type: 'text' }],
                children: [],
                showChildren: false
              }
            ],
            showChildren: false
          }
        ]
      },

    ],
    showChildren: true
  },
  people: [
    {
      id: 'Иванков Игорь Валерьевич',
      name: 'Иванков Игорь Валерьевич',
      photo: 'B01',
      functionName: 'Начальник предприятия',
      branch: 'Филиал Новосибирск',
      fields: {
        Email: 'bigbos@someaddress.nl',
        Phone: '0345-394930203',
        Homepage: 'nu.nl',
        Country: 'Netherlands',
        City: 'Amsterdam',
        Street: 'Kalverstraat 1'
      }
    },
    {
      id: 'Гусаров Сергей Петрович',
      name: 'Гусаров Сергей Петрович',
      photo: 'B01',
      functionName: 'Главный инженер',
      branch: 'Филиал Новосибирск',
      fields: {
        Email: 'bigbos@someaddress.nl',
        Phone: '0345-394930203',
        Homepage: 'nu.nl',
        Country: 'Netherlands',
        City: 'Amsterdam',
        Street: 'Kalverstraat 1'
      }
    },
    {
      id: 'Иван Алексеевич Павлов',
      name: 'Иван Алексеевич Павлов',
      photo: 'B01',
      functionName: 'Главный инженер',
      branch: 'Филиал Новосибирск',
      fields: {
        Email: 'bigbos@someaddress.nl',
        Phone: '0345-394930203',
        Homepage: 'nu.nl',
        Country: 'Netherlands',
        City: 'Amsterdam',
        Street: 'Kalverstraat 1'
      }
    },
    {
      id: 'Алексей Романович Лебедев',
      name: 'Алексей Романович Лебедев',
      photo: 'B01',
      functionName: 'Главный инженер',
      branch: 'Филиал Новосибирск',
      fields: {
        Email: 'bigbos@someaddress.nl',
        Phone: '0345-394930203',
        Homepage: 'nu.nl',
        Country: 'Netherlands',
        City: 'Amsterdam',
        Street: 'Kalverstraat 1'
      }
    },
    {
      id: 'Мария Николаевна Крылова',
      name: 'Мария Николаевна Крылова',
      photo: 'B01',
      functionName: 'Начальник отдела кадров',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Седова Анна Викторовна',
      name: 'Седова Анна Викторовна',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Елена Викторовна Сидорова',
      name: 'Елена Викторовна Сидорова',
      photo: 'B01',
      functionName: 'Инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Ольга Валерьевна Михайлова',
      name: 'Ольга Валерьевна Михайлова',
      photo: 'B01',
      functionName: 'Инженер по обучению',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Георгий Георгиевич Георгиев',
      name: 'Георгий Георгиевич Георгиев',
      photo: 'B01',
      functionName: 'Начальник отдела кадров',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Фёдор Фёдорович Фёдоров',
      name: 'Фёдор Фёдорович Фёдоров',
      photo: 'B01',
      functionName: 'Начальник отдела кадров',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Станислав Станиславович Станиславов',
      name: 'Станислав Станиславович Станиславов',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Борис Борисович Борисов',
      name: 'Борис Борисович Борисов',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Егор Егорович Егоров',
      name: 'Егор Егорович Егоров',
      photo: 'B01',
      functionName: 'Инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Даниил Даниилович Даниилов',
      name: 'Даниил Даниилович Даниилов',
      photo: 'B01',
      functionName: 'Инженер по обучению',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Степан Степанович Степанов',
      name: 'Степан Степанович Степанов',
      photo: 'B01',
      functionName: 'Инженер по обучению',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Сева Северович Северов',
      name: 'Сева Северович Северов',
      photo: 'B01',
      functionName: 'Инженер по обучению',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Роман Романович Романов',
      name: 'Роман Романович Романов',
      photo: 'B01',
      functionName: 'Начальник отдела кадров',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Валентин Валентинович Валентинов',
      name: 'Валентин Валентинович Валентинов',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Иван Иванович Иванов',
      name: 'Иван Иванович Иванов',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
    {
      id: 'Леонид Леонидович Леонидов',
      name: 'Леонид Леонидович Леонидов',
      photo: 'B01',
      functionName: 'Ведущий инженер',
      branch: 'Филиал Новосибирск',
    },
  ],
  assignments: [
    {
      department_id: '1',
      id: 0,
      person_id: 'Иванков Игорь Валерьевич',
      role: 'strategy consultanting'
    },
    {

    }
  ]
}
var UPDATED_ON = '13-09-2020'
