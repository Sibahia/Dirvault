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

        let rows = ['Name', 'Class', 'Status', 'Actions']

        for (cell in rows) {
            let headerCell = document.createElement('th')
            headerCell.innerHTML = rows[cell];
            document.getElementById('head').appendChild(headerCell)
        }

        data.map((user) => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${user.userSoliName}</td>
            <td>${user.userSoliClass}</td>
            <td class="icon-idle"><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" id="icon-idle"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg> Idle</td>
            <td><button class="btn-submit" id="btn-submit-denied" onclick="deleteUser('${user.userSoliName}')"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"/></svg></button> <button type="submit" class="btn-submit" id="btn-submit-approve"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg></button></td>
            `
            tbodys.appendChild(tr)
        })
    })
    .catch(err => console.log(err))

function deleteUser(name) {

    fetch(`http://localhost:5500/users/name/${name}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => console.log(error))

}


// let DOM = document.getElementById('usersLists')
// console.log(dates.json(userSoliName))
// DOM.insertRow(dates.json().userSoliName)