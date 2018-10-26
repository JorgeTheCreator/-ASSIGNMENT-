const studentRecords = [];
const STORE = localStorage.getItem('studentList');
$(document).ready(function() {
  dropDown();

  display10ToHTML();

  $('.container btn btn-success').submit(function() {
    return false;
  });
});

// =================================================//
//      onClick: DELETES STUDENT RECORD              //
// =================================================//

$(document).on('click', '.delete', function() {
  console.log('------this----');
  const rowId = $(this)
    .parent()
    .closest('tr');
  console.log(rowId);
  //remove row from table
  console.log(
    $(this)
      .parent()
      .parent()
      .attr('id')
  );
  $(this)
    .closest('tr')
    .remove();

  $('.add-new').removeAttr('disabled');
});

// =================================================//
//  100 student object and push it to localStorage  //
// =================================================//

print100Students(STORE);

// =================================================//
//          FUNCTION: addStudent()                  //
// =================================================//

function addStudent() {
  const firstName = $('#firstname')[0].value;
  const lastName = $('#lastname')[0].value;
  const email = $('#email')[0].value;
  const location = $('#location')[0].value;
  const phone = $('#phone')[0].value;
  const englishMark = $('#english')[0].value;
  const scienceMark = $('#science')[0].value;
  const computerMark = $('#computer')[0].value;
  const hardwareMark = $('#hardware')[0].value;
  const comm = $('#communication')[0].value;
  const perm = $('#permanent')[0].value;

  //==========Create New Student Object==============//

  const newStudent = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    location: location,
    phone: phone,
    address: {
      communication: comm,
      permanent: perm
    },
    marks: {
      english: englishMark,
      science: scienceMark,
      computers: computerMark,
      hardware: hardwareMark
    }
  };
  //==========Create New Student Object==============//
  console.log('----------------newStudent-----------');

  console.log(newStudent);

  // ======FUNCTION: Save Student To Local Storage===========//

  saveToLocalStorage(newStudent);
  clearForm();
}

$(document).ready(function() {
  $('submit').click(function(event) {
    event.preventDefault();
  });
});
// =================================================//
//          FUNCTION:PRINT 100 OBJECT      //
// =================================================//

function print100Students(data) {
  if (!data) {
    for (let i = 1; i < 101; i++) {
      studentRecords.push({
        firstname: `jorge${i}`,
        lastname: `peguero`,
        email: `jorge@gmail.com`,
        location: [`Piscataway`, `NewYork`, `California`],
        phone: `9731233457`,
        address: {
          communication: `Itlize, Piscataway, New Jersey`,
          permanent: `North Brunswick, NJ USA`
        },
        marks: {
          english: 90,
          science: 65,
          computers: 84,
          hardware: 80
        }
      });

      //console.log(studentRecords);
      const studentJSON = JSON.stringify(studentRecords);
      //console.log(studentJSON);
      localStorage.setItem('studentList', studentJSON); //add 100 records to local storage
      let student = JSON.parse(localStorage.getItem('studentList'));
      // console.log students
      console.log(student.length);
    }
  } else {
    return alert('Hey Please Check your Local-storage');
  }
}

// =================================================//
//    FUNCTION: SAVES STUDENT RCRD TO LOCAL STORAGE //
// =================================================//

function saveToLocalStorage(StudentRecord) {
  let data = JSON.parse(localStorage.getItem('studentList'));
  data.push(StudentRecord);
  localStorage.setItem('studentList', JSON.stringify(data));
  console.log(data.length);
}
// =================================================//
//    FUNCTION: clears form                         //
// =================================================//
function clearForm() {
  $('form')
    .get(0)
    .reset();
}

// =================================================//
//    FUNCTION: DropDown                             //
// =================================================//
function dropDown() {
  $('select.form-control').change(function() {
    const selectedPage = $('.form-control option:selected')
      .val()
      .trim();
    if (selectedPage == 100) {
      display100ToHTML();
    } else if (selectedPage == 10) {
      display10ToHTML();
    } else if (selectedPage == 20) {
      display20ToHTML();
    } else if (selectedPage == 50) {
      display50ToHTML();
    } else {
      console.log('bye');
    }
  });
}

// =================================================//
//    FUNCTION: display100 Objects                  //
// =================================================//
function display100ToHTML() {
  // Retrieve the object from storage
  const retrievedStudent = localStorage.getItem('studentList');
  // parse your data
  const parseData = JSON.parse(retrievedStudent);
  let stnTable = '';
  parseData.forEach((student, index) => {
    console.log('======');
    const phoneNmbr = student.phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    );

    stnTable += `
  <tr id = ${index}>
      <td>
      ${index + 1}
      </td>
      <td>${student.firstname} </td>
      <td>${student.lastname} ${index + 1}</td>
      <td>${student.email}</td>
      <td>${phoneNmbr}</td>
      <td> <b>Communication</b>: ${
        student.address.communication
      } <br><b>Permanent</b>: ${student.address.permanent}</td>
      <td id="myRow-${index + 1}">
          <a href="#editStudentModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
          <a href="#viewStudentModal" class="view" title="View"  data-toggle="modal" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
          <a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="material-icons"
          data-toggle="tooltip" onclick="deleteStudent(this)" title="Delete">&#xE872;</i></a>
      </td>
  </tr>
`;
  });
  $('#output').html(stnTable);
}
// =================================================//
//    FUNCTION: display10 Objects                  //
// =================================================//
function display10ToHTML() {
  // Retrieve the object from storage
  const retrievedStudent = localStorage.getItem('studentList');
  // parse your data
  const parseData = JSON.parse(retrievedStudent);
  let stnTable = '';
  const student10 = parseData.filter((stuObject, index) => index < 10);
  student10.forEach((student, index) => {
    console.log('======');
    const phoneNmbr = student.phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    );

    stnTable += `
    <tr id = ${index}">
      <td>
      ${index + 1}
      </td>
      <td>${student.firstname} </td>
      <td>${student.lastname} ${index + 1}</td>
      <td>${student.email}</td>
      <td>${phoneNmbr}</td>
      <td> <b>Communication</b>: ${
        student.address.communication
      } <br><b>Permanent</b>: ${student.address.permanent}</td>
      <td id="myRow-${index + 1}">
          <a href="#editStudentModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
          <a href="#viewStudentModal" class="view" title="View"  data-toggle="modal" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
          <a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="material-icons"
          data-toggle="tooltip" onclick="editRecord(this)" title="Delete">&#xE872;</i></a>
      </td>
  </tr>
  `;
  });

  $('#output').html(stnTable);
}
// =================================================//
//    FUNCTION: display20 Objects                  //
// =================================================//
function display20ToHTML() {
  // Retrieve the object from storage
  const retrievedStudent = localStorage.getItem('studentList');
  // parse your data
  const parseData = JSON.parse(retrievedStudent);
  let stnTable = '';
  const student20 = parseData.filter((stuObject, index) => index < 20);
  student20.forEach((student, index) => {
    console.log('======');
    const phoneNmbr = student.phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    );

    stnTable += `
    <tr id = ${index}>
    <td>
    ${index + 1}
    </td>
    <td>${student.firstname} </td>
    <td>${student.lastname} ${index + 1}</td>
    <td>${student.email}</td>
    <td>${phoneNmbr}</td>
    <td> <b>Communication</b>: ${
      student.address.communication
    } <br><b>Permanent</b>: ${student.address.permanent}</td>
    <td id="myRow-${index + 1}">
        <a href="#editStudentModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#viewStudentModal" class="view" title="View"  data-toggle="modal" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
        <a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="material-icons"
        data-toggle="tooltip" onclick="deleteStudent(this)" title="Delete">&#xE872;</i></a>
    </td>
</tr>
    `;
  });

  $('#output').html(stnTable);
}

// =================================================//
//    FUNCTION: display50 Objects                  //
// =================================================//

function display50ToHTML() {
  // Retrieve the object from storage
  const retrievedStudent = localStorage.getItem('studentList');
  // parse your data
  const parseData = JSON.parse(retrievedStudent);
  let stnTable = '';
  const student50 = parseData.filter((stuObject, index) => index < 50);
  student50.forEach((student, index) => {
    console.log('======');
    const phoneNmbr = student.phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    );

    stnTable += `
    <tr id = ${index}">
    <td>
    ${index + 1}
    </td>
    <td>${student.firstname} </td>
    <td>${student.lastname} ${index + 1}</td>
    <td>${student.email}</td>
    <td>${phoneNmbr}</td>
    <td> <b>Communication</b>: ${
      student.address.communication
    } <br><b>Permanent</b>: ${student.address.permanent}</td>
    <td id="myRow-${index + 1}">
        <a href="#editStudentModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#viewStudentModal" class="view" title="View"  data-toggle="modal" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
        <a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="material-icons"
        data-toggle="tooltip" onclick="deleteStudent(this)" title="Delete">&#xE872;</i></a>
    </td>
</tr>
      `;
  });

  $('#output').html(stnTable);
}

// =================================================//
//  filter table rows based on searched term        //
// =================================================//

$(document).ready(function() {
  // Filter table rows based on searched term
  $('#search').on('keyup', function() {
    let term = $(this)
      .val()
      .toLowerCase();
    $('table tbody tr').each(function() {
      $row = $(this);
      console.log(this);
      let name = $row
        .find('td:nth-child(2)')
        .text()
        .toLowerCase();
      console.log(name);
      if (name.search(term) < 0) {
        $row.hide();
      } else {
        $row.show();
      }
    });
  });
});

$(document).ready(function() {
  $('#search').keyup(function() {
    searchRecord($(this).val());
  });
});

//-------css styling when certain button are clicked the colord will change in the background--
$(document).ready(function() {
  $('.view, .delete, .edit, .btn-info, .btn-success,.btn-default').click(
    function() {
      $('.table-wrapper').toggleClass('shadow');
      $('.table-title').toggleClass('colorForTitle');
    }
  );
});
