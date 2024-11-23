fetch(`http://localhost:5500/solic`, {
        method: 'GET',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        let theaders = document.getElementById('theaders')
        let tbodys = document.getElementById('tbodys')

        let rows = ['Name', 'Class', 'Status']

        for (cell in rows) {
            let headerCell = document.createElement('th')
            headerCell.innerHTML = rows[cell];
            theaders.appendChild(headerCell)
        }
    })
    .catch(err => console.log(err))

// let DOM = document.getElementById('usersLists')
// console.log(dates.json(userSoliName))
// DOM.insertRow(dates.json().userSoliName)