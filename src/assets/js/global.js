import dayjs from 'dayjs'

export default {
  timeFormat(x,y) {
    return dayjs(x).format(y)
  },
}