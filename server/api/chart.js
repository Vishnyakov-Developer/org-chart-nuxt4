export default function handler(req, res) {
  // Импортируем данные из статического файла
  const INPUT_DATA = {
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
                },
              ]
            }
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
              id: '10',
              name: 'Охрана труда',
              description: '',
              parent_id: '4',
              staff_department: 'N',
              manager_id: 'Фёдор Фёдорович Фёдоров',
              dataFields: [{ name: 'Location', value: '', type: 'text' }],
              children: [
                {
                  id: '14',
                  name: '',
                  description: '',
                  parent_id: '4',
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
                  parent_id: '4',
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
                  parent_id: '4',
                  staff_department: 'N',
                  manager_id: 'Сева Северович Северов',
                  dataFields: [{ name: 'Location', value: '', type: 'text' }],
                  children: [],
                  showChildren: false
                },
              ]
            },
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
                  parent_id: '4',
                  staff_department: 'N',
                  manager_id: 'Валентин Валентинович Валентинов',
                  dataFields: [{ name: 'Location', value: '', type: 'text' }],
                  children: [],
                  showChildren: false
                },
                {
                  id: '19',
                  name: '',
                  description: '',
                  parent_id: '4',
                  staff_department: 'N',
                  manager_id: 'Иван Иванович Иванов',
                  dataFields: [{ name: 'Location', value: '', type: 'text' }],
                  children: [],
                  showChildren: false
                },
                {
                  id: '20',
                  name: '',
                  description: '',
                  parent_id: '4',
                  staff_department: 'N',
                  manager_id: 'Леонид Леонидович Леонидов',
                  dataFields: [{ name: 'Location', value: '', type: 'text' }],
                  children: [],
                  showChildren: false
                },
              ]
            }
          ]
        }
      ]
    },
    people: [],
    assignments: []
  }

  res.status(200).json(INPUT_DATA)
} 