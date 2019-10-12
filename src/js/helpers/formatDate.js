function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return year + '-' + month + '-' + day; 
}

export default formatDate;