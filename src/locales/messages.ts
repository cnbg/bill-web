interface Messages {
  [key: string]: {
    ru: string
    en: string
  }
}

const messages: Messages = {
  homepage: {
    ru: 'Главная страница',
    en: 'Homepage',
  },
  page_not_found: {
    ru: 'Страница не найдена',
    en: 'Page not found',
  },
  login: {
    ru: 'Войти',
    en: 'Login',
  },
  enter_your_pin: {
    ru: 'Введите ваш пин',
    en: 'Enter your pin',
  },
  enter_your_email: {
    ru: 'Введите вашу э-почту',
    en: 'Enter your email',
  },
  check_pin_validity: {
    ru: 'Проверьте пин',
    en: 'Check pin validity',
  },
  enter_your_password: {
    ru: 'Введите ваш пароль',
    en: 'Enter your password',
  },
  first_name: {
    ru: 'Имя',
    en: 'Firstname',
  },
  last_name: {
    ru: 'Фамилия',
    en: 'Lastname',
  },
  billing_settings: {
    ru: 'Настройки биллинга',
    en: 'Billing settings',
  },
  server_not_responding: {
    ru: 'Сервер не отвечает',
    en: 'Server is not responding',
  },
  try_again: {
    ru: 'Попробуйте снова',
    en: 'Try again',
  },
  password_length_min: {
    ru: 'Пароль должен быть не менее 6 символов',
    en: 'Password must be at least 6 characters',
  },
  error: {
    ru: 'Ошибка',
    en: 'Error',
  },
  email: {
    ru: 'Э-почта',
    en: 'Email',
  },
  password: {
    ru: 'Пароль',
    en: 'Password',
  },
  pin: {
    ru: 'Пин',
    en: 'Pin',
  },
  username: {
    ru: 'Имя пользователя',
    en: 'Username',
  },
  logout: {
    ru: 'Выйти',
    en: 'Logout',
  },
  profile: {
    ru: 'Профиль',
    en: 'Profile',
  },
  settings: {
    ru: 'Настройки',
    en: 'Settings',
  },
  language: {
    ru: 'Язык',
    en: 'Language',
  },
  name: {
    ru: 'Имя',
    en: 'Name',
  },
  title: {
    ru: 'Название',
    en: 'Title',
  },
  select: {
    ru: 'Выберите',
    en: 'Select',
  },
  loading: {
    ru: 'Загружается',
    en: 'Loading',
  },
  empty_data: {
    ru: 'Нет данных для отображения',
    en: 'No data to display',
  },
  not_found: {
    ru: 'Не найдено',
    en: 'Not Found',
  },
  are_you_sure: {
    ru: 'Вы уверены?',
    en: 'Are you sure?',
  },
  dont_have_access: {
    ru: 'У вас нет доступа',
    en: 'You don\'t have access',
  },
  no_data: {
    ru: 'Нет данных',
    en: 'No data',
  },
  theme: {
    ru: 'Тема',
    en: 'Theme',
  },
  dark: {
    ru: 'Темная',
    en: 'Dark',
  },
  light: {
    ru: 'Светлая',
    en: 'Light',
  },
  error_during_login: {
    ru: 'Произошла ошибка при входе',
    en: 'An error occurred during login',
  },
  enter_valid_email: {
    ru: 'Введите корректную э-почту',
    en: 'Enter a valid email',
  },
  password_length_error: {
    ru: 'Пароль должен быть не менее 6 символов',
    en: 'Password must be at least 6 characters',
  },
  error_fetching_data: {
    ru: 'Произошла ошибка при получении данных',
    en: 'An error occurred while fetching data',
  },
  error_saving_data: {
    ru: 'Произошла ошибка при сохранении данных',
    en: 'An error occurred while saving data',
  },
  error_deleting_data: {
    ru: 'Произошла ошибка при удалении данных',
    en: 'An error occurred while deleting data',
  },
  invalid_username_or_password: {
    ru: 'Неверное имя пользователя или пароль',
    en: 'Invalid username or password',
  },
  residents: {
    ru: 'Жильцы',
    en: 'Residents',
  },
  'org-type': {
    ru: 'Вид организации',
    en: 'Organization type',
  },
  'client-type': {
    ru: 'Вид абонента',
    en: 'Client type',
  },
  rate: {
    ru: 'Тариф',
    en: 'Rate',
  },
  rates: {
    ru: 'Тарифы',
    en: 'Rates',
  },
  orgs: {
    ru: 'Организации',
    en: 'Organizations',
  },
  org: {
    ru: 'Организация',
    en: 'Organization',
  },
  roles: {
    ru: 'Роли',
    en: 'Roles',
  },
  role: {
    ru: 'Роль',
    en: 'Role',
  },
  select_org: {
    ru: 'Выберите организацию',
    en: 'Select organization',
  },
  switch_org: {
    ru: 'Сменить организацию',
    en: 'Switch organization',
  },
  no_access_to_page: {
    ru: 'У вас нет доступа к этой странице',
    en: 'You don\'t have access to this page',
  },
  payments: {
    ru: 'Платежи',
    en: 'Payments',
  },
  payment: {
    ru: 'Платеж',
    en: 'Payment',
  },
  account: {
    ru: 'Счет',
    en: 'Account',
  },
  amount: {
    ru: 'Сумма',
    en: 'Amount',
  },
  source: {
    ru: 'Источник',
    en: 'Source',
  },
  status: {
    ru: 'Статус',
    en: 'Status',
  },
  year: {
    ru: 'Год',
    en: 'Year',
  },
  month: {
    ru: 'Месяц',
    en: 'Month',
  },
  note: {
    ru: 'Примечание',
    en: 'Note',
  },
  completed: {
    ru: 'Завершено',
    en: 'Completed',
  },
  pending: {
    ru: 'В ожидании',
    en: 'Pending',
  },
  failed: {
    ru: 'Неудачно',
    en: 'Failed',
  },
  view: {
    ru: 'Просмотр',
    en: 'View',
  },
  edit: {
    ru: 'Редактировать',
    en: 'Edit',
  },
  delete: {
    ru: 'Удалить',
    en: 'Delete',
  },
  create: {
    ru: 'Создать',
    en: 'Create',
  },
  update: {
    ru: 'Обновить',
    en: 'Update',
  },
  cancel: {
    ru: 'Отмена',
    en: 'Cancel',
  },
  save: {
    ru: 'Сохранить',
    en: 'Save',
  },
  confirm: {
    ru: 'Подтвердить',
    en: 'Confirm',
  },
  yes: {
    ru: 'Да',
    en: 'Yes',
  },
  no: {
    ru: 'Нет',
    en: 'No',
  },
  reference: {
    ru: 'Справочник',
    en: 'Reference',
  },
  support: {
    ru: 'Поддержка',
    en: 'Support',
  },
  perms: {
    ru: 'Права доступа',
    en: 'Permissions',
  },
  articles: {
    ru: 'Новости',
    en: 'News',
  },
  users: {
    ru: 'Пользователи',
    en: 'Users',
  },
  user: {
    ru: 'Пользователь',
    en: 'User',
  },
  clients: {
    ru: 'Абоненты',
    en: 'Clients',
  },
  client: {
    ru: 'Клиент',
    en: 'Client',
  },
  search: {
    ru: 'Поиск',
    en: 'Search',
  },
  filter: {
    ru: 'Фильтр',
    en: 'Filter',
  },
  clear: {
    ru: 'Очистить',
    en: 'Clear',
  },
  charges: {
    ru: 'Начисления',
    en: 'Charges',
  },
  charge: {
    ru: 'Начисление',
    en: 'Charge',
  },
  balance: {
    ru: 'Баланс',
    en: 'Balance',
  },
  transactions: {
    ru: 'Транзакции',
    en: 'Transactions',
  },
  transaction: {
    ru: 'Транзакция',
    en: 'Transaction',
  },
  fines: {
    ru: 'Пени',
    en: 'Fines',
  },
  fine: {
    ru: 'Пеня',
    en: 'Fine',
  },
  expenses: {
    ru: 'Расходы',
    en: 'Expenses',
  },
  expense: {
    ru: 'Расход',
    en: 'Expense',
  },
  reports: {
    ru: 'Отчеты',
    en: 'Reports',
  },
  report: {
    ru: 'Отчет',
    en: 'Report',
  },
  regions: {
    ru: 'Области',
    en: 'Regions',
  },
  region: {
    ru: 'Область',
    en: 'Region',
  },
  districts: {
    ru: 'Районы',
    en: 'Districts',
  },
  district: {
    ru: 'Район',
    en: 'District',
  },
  streets: {
    ru: 'Улицы',
    en: 'Streets',
  },
  street: {
    ru: 'Улица',
    en: 'Street',
  },
  houses: {
    ru: 'Дома',
    en: 'Houses',
  },
  house: {
    ru: 'Дом',
    en: 'House',
  },
  apartments: {
    ru: 'Квартиры',
    en: 'Apartments',
  },
  apartment: {
    ru: 'Квартира',
    en: 'Apartment',
  },
  org_types: {
    ru: 'Типы организаций',
    en: 'Organization types',
  },
  org_type: {
    ru: 'Тип организации',
    en: 'Organization type',
  },
  client_types: {
    ru: 'Типы клиентов',
    en: 'Client types',
  },
  client_type: {
    ru: 'Тип клиента',
    en: 'Client type',
  },
  addresses: {
    ru: 'Адреса',
    en: 'Addresses',
  },
  address: {
    ru: 'Адрес',
    en: 'Address',
  },
  billing: {
    ru: 'Биллинг',
    en: 'Billing',
  },
  bakai: {
    ru: 'Бакай',
    en: 'Bakai',
  },
  obank: {
    ru: 'Обанк',
    en: 'Obank',
  },
  mbank: {
    ru: 'Мбанк',
    en: 'Mbank',
  },
  cash: {
    ru: 'Наличка',
    en: 'Cash',
  },
  area: {
    ru: 'Площадь',
    en: 'Area',
  },
  entrance: {
    ru: 'Подъезд',
    en: 'Entrance',
  },
  floor: {
    ru: 'Этаж',
    en: 'Floor',
  },
  house_num: {
    ru: 'Номер дома',
    en: 'House number',
  },
  apart_num: {
    ru: 'Номер квартиры',
    en: 'Apartment number',
  },
  members_count: {
    ru: 'Количество жильцов',
    en: 'Number of residents',
  },
  owner: {
    ru: 'Владелец',
    en: 'Owner',
  },
  tenant: {
    ru: 'Арендатор',
    en: 'Tenant',
  },
  other: {
    ru: 'Другое',
    en: 'Other',
  },
  price: {
    ru: 'Цена',
    en: 'Price',
  },
  type: {
    ru: 'Тип',
    en: 'Type',
  },
  member: {
    ru: 'Жилец',
    en: 'Member',
  },
  members: {
    ru: 'Жильцы',
    en: 'Residents',
  },
  fix: {
    ru: 'Фикс',
    en: 'Fix',
  },
  actions: {
    ru: 'Действия',
    en: 'Actions',
  },
  start: {
    ru: 'Начало',
    en: 'Start',
  },
  end: {
    ru: 'Конец',
    en: 'End',
  },
  period: {
    ru: 'Период',
    en: 'Period',
  },
  active: {
    ru: 'Активный',
    en: 'Active',
  },
  inactive: {
    ru: 'Неактивный',
    en: 'Inactive',
  },
  msquare: {
    ru: 'Кв. метр',
    en: 'Square meter',
  },
  fill_required_fields: {
    ru: 'Заполните все обязательные поля',
    en: 'Fill all required fields',
  },
}

export default messages
