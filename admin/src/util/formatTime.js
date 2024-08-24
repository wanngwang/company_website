import moment from 'moment';


moment.locale("zh-cn")

const formatTime = {
    getTime: (date) => {
        // MMMM Do YYYY, h:mm:ss a
        return moment(date).format('YYYY-MM-DD')
    }
}
export default formatTime