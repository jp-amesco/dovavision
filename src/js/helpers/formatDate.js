const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'dezembro'
];

function formatDate(date, withHour = false, utc = -2) {
    let day = date.getDate();
    let month = months[date.getMonth()];

    let formatedDate = day + ' ' + month.substr(0, 3); 
    if (withHour) {
        let hour = date.getHours() - utc;
        let minutes = date.getMinutes();

        formatedDate += ' ' + hour + 'h' + (minutes === 0 ? '' : minutes.toString().padStart(2, "0")) ;
    }

    return formatedDate;
}

export default formatDate;