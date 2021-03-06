import PickerDay from '@/components/PickerDay.vue'
import {shallow} from '@vue/test-utils'
import {en} from '@/locale'

describe('PickerDay: DOM', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(PickerDay, {
      propsData: {
        allowedToShowView: () => true,
        translation: en,
        pageDate: new Date(2018, 1, 1),
        selectedDate: new Date(2018, 2, 24),
        time: true
      }
    })
  })

  it('knows the selected hour', () => {
    const newDate = new Date(2016, 9, 15, 15, 15)
    wrapper.setProps({
      selectedDate: newDate
    })
    expect(wrapper.vm.hours).toEqual('15:15')
    wrapper.setProps({
      selectedDate: null
    })
    expect(wrapper.vm.hours).toEqual('--:--')
  })

  it('knows the selected date', () => {
    const newDate = new Date(2016, 9, 15)
    wrapper.setProps({
      selectedDate: newDate
    })
    expect(wrapper.vm.isSelectedDate(newDate)).toEqual(true)
    expect(wrapper.vm.isSelectedDate(new Date(2017, 1, 1))).toEqual(false)
  })

  it('emits an event when selected', () => {
    wrapper.vm.selectDate({isDisabled: false})
    expect(wrapper.emitted().selectDate).toBeTruthy()
  })

  it('knows the current page month', () => {
    expect(wrapper.vm.getPageMonth()).toEqual(1)
  })

  it('emits show month calendar event when clicked on the month', () => {
    const monthBtn = wrapper.find('.day__month_btn')
    monthBtn.trigger('click')
    expect(wrapper.emitted().showMonthCalendar).toBeTruthy()
  })

  it('emits show time calendar event when clicked on the time', () => {
    const timeBtn = wrapper.find('.day__time_foot')
    timeBtn.trigger('click')
    expect(wrapper.emitted().showTimeCalendar).toBeTruthy()
  })
})
