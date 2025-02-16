let students = JSON.parse(localStorage.getItem("students")) || [];
        
        function saveToLocalStorage() {
            localStorage.setItem("students", JSON.stringify(students));
        }
        
        function addStudent() {
            let id = document.getElementById("studentId").value;
            let name = document.getElementById("studentName").value;
            let dob = document.getElementById("dob").value;
            let address = document.getElementById("address").value;
            if (id && name) {
                students.push({ id, name, dob, address });
                saveToLocalStorage();
                displayStudents();
            }
        }
        function displayStudents() {
            let list = document.getElementById("studentList");
            list.innerHTML = "";
            students.forEach((s, index) => {
                list.innerHTML += `<tr class='fade-in'>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.dob}</td>
                    <td>${s.address}</td>
                    <td>
                        <button class="btnEdit" onclick='editStudent(${index})'><img src="../image/edit.png"  width="25px" alt=""></button>
                        <button class="btnDelete" onclick='deleteStudent(${index})'><img src="../image/trash.png"  width="25px" alt=""></button>
                    </td>
                </tr>`;
            });
        }
        function deleteStudent(index) {
            students.splice(index, 1);
            saveToLocalStorage();
            displayStudents();
        }
        function editStudent(index) {
            let student = students[index];
            document.getElementById("studentId").value = student.id;
            document.getElementById("studentName").value = student.name;
            document.getElementById("dob").value = student.dob;
            document.getElementById("address").value = student.address;
            students.splice(index, 1);
            saveToLocalStorage();
            displayStudents();
        }
        function sortByName(order) {
            students.sort((a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            saveToLocalStorage();
            displayStudents();
        }
        function sortById(order) {
            students.sort((a, b) => order === 'asc' ? a.id - b.id : b.id - a.id);
            saveToLocalStorage();
            displayStudents();
        }
        function searchStudent() {
            let keyword = document.getElementById("search").value.toLowerCase();
            let filtered = students.filter(s => s.id.includes(keyword) || s.name.toLowerCase().includes(keyword));
            let list = document.getElementById("studentList");
            list.innerHTML = "";
            filtered.forEach((s, index) => {
                list.innerHTML += `<tr class='fade-in'>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.dob}</td>
                    <td>${s.address}</td>
                    <td>
                        <button class="btnEdit" onclick='editStudent(${index})'><img src="../image/edit.png"  width="25px" alt=""></button>
                        <button class="btnDelete" onclick='deleteStudent(${index})'><img src="../image/trash.png"  width="25px" alt=""></button>
                    </td>
                </tr>`;
            });
        }
        
        window.onload = displayStudents;