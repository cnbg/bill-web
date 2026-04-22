import app from './createapp'

import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import KeyFilter from 'primevue/keyfilter'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'
import FocusTrap from 'primevue/focustrap'
import StyleClass from 'primevue/styleclass'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'

import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import ConfirmDialog from 'primevue/confirmdialog'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import Editor from 'primevue/editor'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import Panel from 'primevue/panel'
import Password from 'primevue/password'
import Row from 'primevue/row'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import SplitButton from 'primevue/splitbutton'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ToggleSwitch from 'primevue/toggleswitch'
import Toolbar from 'primevue/toolbar'

app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

app.directive('keyfilter', KeyFilter)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.directive('focustrap', FocusTrap)
app.directive('styleclass', StyleClass)

app.component('Accordion', Accordion)
app.component('AccordionContent', AccordionContent)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionPanel', AccordionPanel)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Button', Button)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ContextMenu', ContextMenu)
app.component('DataTable', DataTable)
app.component('Editor', Editor)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('MultiSelect', MultiSelect)
app.component('Panel', Panel)
app.component('Password', Password)
app.component('Row', Row)
app.component('Select', Select)
app.component('SelectButton', SelectButton)
app.component('SplitButton', SplitButton)
app.component('Tab', Tab)
app.component('TabList', TabList)
app.component('TabPanel', TabPanel)
app.component('TabPanels', TabPanels)
app.component('Tabs', Tabs)
app.component('Tag', Tag)
app.component('Toast', Toast)
app.component('ToggleSwitch', ToggleSwitch)
app.component('Toolbar', Toolbar)

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
} as any)

export default app
