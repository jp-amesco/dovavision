const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'dezembro'
];

function formatDate(date, withHour = false) {
    let day = date.getDate();
    let month = months[date.getMonth()];
    
    let formatedDate = day + ' ' + month.substr(0, 3); 
    if (withHour) {
        let hour = date.getUTCHours();
        let minutes = date.getUTCMinutes();

        formatedDate += ' ' + hour + 'h' + (minutes === 0 ? '' : minutes) ;
    }

    return formatedDate;
}

export default formatDate;